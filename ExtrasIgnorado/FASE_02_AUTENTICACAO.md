# 🔐 FASE 2: Sistema de Autenticação

**Duração:** 5 dias  
**Prioridade:** P0 (Crítico)  
**Responsável:** Copilot (core) + Qwen (testes/docs)

---

## 🎯 Objetivos

- [ ] Criar modelo User customizado
- [ ] Implementar registro de usuários
- [ ] Implementar login com JWT
- [ ] Implementar refresh token
- [ ] Recuperação de senha
- [ ] Endpoints de perfil

---

## 📋 Checklist de Tarefas

### 1️⃣ Criar Modelo User Customizado

**Tarefa para: COPILOT**

**Contexto:**
- Herdar de AbstractBaseUser
- Adicionar campos extras (telefone, preferências)
- Configurar como AUTH_USER_MODEL

**Implementação em `apps/users/models.py`:**

```python
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from core.models import BaseModel

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O email é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    email = models.EmailField(unique=True, verbose_name='E-mail')
    name = models.CharField(max_length=255, verbose_name='Nome')
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Preferências
    default_margin = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=100.00,
        help_text='Margem de lucro padrão (%)'
    )
    
    # Permissões
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return self.email
```

**Checklist:**
- [ ] UserManager criado
- [ ] Modelo User customizado
- [ ] EMAIL como USERNAME_FIELD
- [ ] Campos extras adicionados
- [ ] Meta configurado

**Configurar em `settings/base.py`:**
```python
AUTH_USER_MODEL = 'users.User'
```

---

### 2️⃣ Criar Serializers de Autenticação

**Tarefa para: COPILOT → QWEN (testes)**

**Arquivo: `apps/users/serializers.py`**

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'default_margin', 'created_at']
        read_only_fields = ['id', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password_confirm', 'phone']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                "password": "As senhas não conferem."
            })
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True, validators=[validate_password])
```

**Checklist:**
- [ ] UserSerializer criado
- [ ] RegisterSerializer com validação
- [ ] CustomTokenObtainPairSerializer
- [ ] ChangePasswordSerializer
- [ ] Serializers de reset senha

---

### 3️⃣ Implementar Views de Autenticação

**Tarefa para: COPILOT**

**Arquivo: `apps/users/views.py`**

```python
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, 
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """Registro de novos usuários"""
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    """Login com retorno de dados do usuário"""
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Visualizar e editar perfil do usuário autenticado"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    """Alterar senha do usuário autenticado"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            
            # Verifica senha antiga
            if not user.check_password(serializer.data.get('old_password')):
                return Response(
                    {'old_password': 'Senha incorreta.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Define nova senha
            user.set_password(serializer.data.get('new_password'))
            user.save()
            
            return Response({'message': 'Senha alterada com sucesso.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAccountView(APIView):
    """Deletar conta do usuário (soft delete)"""
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request):
        user = request.user
        user.is_active = False
        user.save()
        return Response({'message': 'Conta deletada com sucesso.'})
```

**Checklist:**
- [ ] RegisterView criado
- [ ] CustomTokenObtainPairView
- [ ] UserProfileView (GET/PUT)
- [ ] ChangePasswordView
- [ ] DeleteAccountView (soft delete)

---

### 4️⃣ Configurar URLs de Autenticação

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure as URLs de autenticação:

1. Em apps/users/urls.py:
   from django.urls import path
   from rest_framework_simplejwt.views import TokenRefreshView
   from .views import (
       RegisterView,
       CustomTokenObtainPairView,
       UserProfileView,
       ChangePasswordView,
       DeleteAccountView,
   )
   
   urlpatterns = [
       path('register/', RegisterView.as_view(), name='register'),
       path('login/', CustomTokenObtainPairView.as_view(), name='login'),
       path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
       path('profile/', UserProfileView.as_view(), name='profile'),
       path('change-password/', ChangePasswordView.as_view(), name='change_password'),
       path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
   ]

2. Certifique-se que está incluído em apps/urls.py

Implemente as URLs.
```

**Checklist:**
- [ ] URLs criadas
- [ ] Nomes configurados
- [ ] Incluído em apps/urls.py

---

### 5️⃣ Configurar Admin

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure o Django Admin para o modelo User:

Em apps/users/admin.py:

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'name', 'is_staff', 'is_active', 'created_at']
    list_filter = ['is_staff', 'is_active', 'created_at']
    search_fields = ['email', 'name']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informações Pessoais', {'fields': ('name', 'phone')}),
        ('Preferências', {'fields': ('default_margin',)}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Datas', {'fields': ('created_at', 'updated_at')}),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

Implemente o admin.
```

**Checklist:**
- [ ] UserAdmin configurado
- [ ] Campos de exibição
- [ ] Filtros adicionados
- [ ] Busca configurada

---

### 6️⃣ Executar Migrações

**Tarefa para: DESENVOLVEDOR**

```bash
python manage.py makemigrations users
python manage.py migrate
python manage.py createsuperuser
```

**Checklist:**
- [ ] Migrações criadas
- [ ] Migrações aplicadas
- [ ] Superuser recriado com novo modelo

---

### 7️⃣ Criar Testes Unitários

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie testes unitários completos para autenticação:

Em apps/users/tests.py:

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/users/register/'
    
    def test_register_user_success(self):
        """Teste de registro bem-sucedido"""
        data = {
            'email': 'test@example.com',
            'name': 'Test User',
            'password': 'TestPass123!',
            'password_confirm': 'TestPass123!',
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@example.com').exists())
    
    def test_register_password_mismatch(self):
        """Teste de erro quando senhas não conferem"""
        data = {
            'email': 'test@example.com',
            'name': 'Test User',
            'password': 'TestPass123!',
            'password_confirm': 'DifferentPass123!',
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class UserLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = '/api/users/login/'
        self.user = User.objects.create_user(
            email='test@example.com',
            password='TestPass123!',
            name='Test User'
        )
    
    def test_login_success(self):
        """Teste de login bem-sucedido"""
        data = {
            'email': 'test@example.com',
            'password': 'TestPass123!',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_login_invalid_credentials(self):
        """Teste de login com credenciais inválidas"""
        data = {
            'email': 'test@example.com',
            'password': 'WrongPassword',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class UserProfileTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile_url = '/api/users/profile/'
        self.user = User.objects.create_user(
            email='test@example.com',
            password='TestPass123!',
            name='Test User'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_get_profile(self):
        """Teste de obtenção do perfil"""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
    
    def test_update_profile(self):
        """Teste de atualização do perfil"""
        data = {'name': 'Updated Name'}
        response = self.client.patch(self.profile_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.name, 'Updated Name')

Implemente todos os testes.
```

**Checklist:**
- [ ] Testes de registro
- [ ] Testes de login
- [ ] Testes de perfil
- [ ] Testes de alteração de senha
- [ ] Todos os testes passando

**Validação:**
```bash
python manage.py test apps.users
```

---

### 8️⃣ Documentar Endpoints

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Documente os endpoints de autenticação usando docstrings do DRF:

Adicione docstrings detalhadas em cada view com:
- Descrição do endpoint
- Parâmetros esperados
- Respostas possíveis
- Exemplos de uso

Use o formato que o drf-spectacular reconhece.

Também crie um arquivo docs/API_AUTH.md com exemplos de requisições curl.
```

**Checklist:**
- [ ] Docstrings adicionadas
- [ ] Swagger atualizado
- [ ] Arquivo API_AUTH.md criado
- [ ] Exemplos curl incluídos

---

### 9️⃣ Testar Manualmente

**Tarefa para: DESENVOLVEDOR**

**Testes manuais:**

```bash
# 1. Registrar usuário
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "name": "Usuário Teste",
    "password": "SenhaForte123!",
    "password_confirm": "SenhaForte123!"
  }'

# 2. Login
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "SenhaForte123!"
  }'

# 3. Acessar perfil (use o token do login)
curl -X GET http://localhost:8000/api/users/profile/ \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Checklist:**
- [ ] Registro funciona
- [ ] Login retorna tokens
- [ ] Refresh token funciona
- [ ] Perfil acessível com token
- [ ] Alterar senha funciona
- [ ] Validações funcionando

---

## ✅ Critérios de Aceitação

Fase 2 completa quando:

- [ ] Modelo User customizado criado
- [ ] Registro de usuários funcionando
- [ ] Login com JWT funcionando
- [ ] Refresh token funcionando
- [ ] Perfil do usuário acessível
- [ ] Alteração de senha funcionando
- [ ] Soft delete de conta funcionando
- [ ] Admin configurado
- [ ] Testes unitários com >80% cobertura
- [ ] API documentada no Swagger
- [ ] Testes manuais passando

**Validação final:**
```bash
python manage.py test apps.users
curl http://localhost:8000/api/docs/  # Ver endpoints documentados
```

---

## 🚀 Próximos Passos

Após completar Fase 2:
→ **Avançar para FASE_03_INGREDIENTES.md**

---

## 📝 Notas

- **Tempo estimado:** 1-2 dias
- **Dificuldade:** Média-Alta
- **Pode ser automatizado:** 60%
- **Depende de:** Fase 1
- **Requerido para:** Todas as fases seguintes

---

**Status:** ⏸️ Aguardando execução  
**Última atualização:** 2025-01-10
