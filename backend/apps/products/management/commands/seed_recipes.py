from django.core.management.base import BaseCommand
from apps.products.models import Recipe
from decimal import Decimal


class Command(BaseCommand):
    help = 'Popula o banco de dados com receitas iniciais'

    def handle(self, *args, **kwargs):
        # Verificar se já existem receitas
        if Recipe.objects.exists():
            msg = '✅ Receitas já existem no banco!'
            self.stdout.write(self.style.WARNING(msg))
            return

        # Dados iniciais de receitas baseadas no frontend
        recipes_data = [
            {
                'name': 'Brigadeiro',
                'category': 'Doce',
                'production_cost': Decimal('2.50'),
                'sale_price': Decimal('8.00'),
                'yield_quantity': Decimal('20'),
                'yield_unit': 'unidades',
                'description': 'Brigadeiro tradicional de chocolate',
            },
            {
                'name': 'beijinho',
                'category': 'Doce',
                'production_cost': Decimal('2.00'),
                'sale_price': Decimal('7.00'),
                'yield_quantity': Decimal('20'),
                'yield_unit': 'unidades',
                'description': 'Beijinho de coco',
            },
            {
                'name': 'Olho de Sogra',
                'category': 'Doce',
                'production_cost': Decimal('1.80'),
                'sale_price': Decimal('6.50'),
                'yield_quantity': Decimal('15'),
                'yield_unit': 'unidades',
                'description': 'Olho de sogra de goiaba e chocolate',
            },
            {
                'name': 'Trufa',
                'category': 'Doce',
                'production_cost': Decimal('3.20'),
                'sale_price': Decimal('10.00'),
                'yield_quantity': Decimal('15'),
                'yield_unit': 'unidades',
                'description': 'Trufa gourmet de chocolate',
            },
            {
                'name': 'Docinho de Leite',
                'category': 'Doce',
                'production_cost': Decimal('2.30'),
                'sale_price': Decimal('8.50'),
                'yield_quantity': Decimal('25'),
                'yield_unit': 'unidades',
                'description': 'Docinho de leite condensado',
            },
            {
                'name': 'Bicho de Pé',
                'category': 'Doce',
                'production_cost': Decimal('1.50'),
                'sale_price': Decimal('5.50'),
                'yield_quantity': Decimal('20'),
                'yield_unit': 'unidades',
                'description': 'Bicho de pé de chocolate',
            },
            {
                'name': 'Losango',
                'category': 'Doce',
                'production_cost': Decimal('2.80'),
                'sale_price': Decimal('9.00'),
                'yield_quantity': Decimal('12'),
                'yield_unit': 'unidades',
                'description': 'Losango de chocolate e castanha',
            },
            {
                'name': 'Paçoca',
                'category': 'Doce',
                'production_cost': Decimal('1.90'),
                'sale_price': Decimal('6.00'),
                'yield_quantity': Decimal('18'),
                'yield_unit': 'unidades',
                'description': 'Paçoca de amendoim',
            },
            {
                'name': 'Cocada',
                'category': 'Doce',
                'production_cost': Decimal('2.10'),
                'sale_price': Decimal('7.50'),
                'yield_quantity': Decimal('16'),
                'yield_unit': 'unidades',
                'description': 'Cocada branca e pura',
            },
            {
                'name': 'Pirulito de Chocolate',
                'category': 'Doce',
                'production_cost': Decimal('1.20'),
                'sale_price': Decimal('4.50'),
                'yield_quantity': Decimal('30'),
                'yield_unit': 'unidades',
                'description': 'Pirulito caseiro de chocolate',
            },
            {
                'name': 'Broinhas de Chuva',
                'category': 'Salgado',
                'production_cost': Decimal('3.00'),
                'sale_price': Decimal('10.00'),
                'yield_quantity': Decimal('12'),
                'yield_unit': 'unidades',
                'description': 'Broinhas crocantes de chuva',
            },
            {
                'name': 'Bolo de Cenoura',
                'category': 'Bolo',
                'production_cost': Decimal('8.00'),
                'sale_price': Decimal('35.00'),
                'yield_quantity': Decimal('1'),
                'yield_unit': 'unidade',
                'description': 'Bolo de cenoura com cobertura de chocolate',
            },
            {
                'name': 'Bolo de Chocolate',
                'category': 'Bolo',
                'production_cost': Decimal('9.00'),
                'sale_price': Decimal('40.00'),
                'yield_quantity': Decimal('1'),
                'yield_unit': 'unidade',
                'description': 'Bolo cremoso de chocolate',
            },
            {
                'name': 'Cupcake',
                'category': 'Bolo',
                'production_cost': Decimal('1.50'),
                'sale_price': Decimal('6.00'),
                'yield_quantity': Decimal('12'),
                'yield_unit': 'unidades',
                'description': 'Cupcake decorado',
            },
            {
                'name': 'Torta de Morango',
                'category': 'Bolo',
                'production_cost': Decimal('12.00'),
                'sale_price': Decimal('50.00'),
                'yield_quantity': Decimal('1'),
                'yield_unit': 'unidade',
                'description': 'Torta gelada de morango',
            },
        ]

        created_count = 0
        for recipe_data in recipes_data:
            recipe, created = Recipe.objects.get_or_create(
                name=recipe_data['name'],
                defaults={
                    'category': recipe_data['category'],
                    'production_cost': recipe_data['production_cost'],
                    'sale_price': recipe_data['sale_price'],
                    'yield_quantity': recipe_data['yield_quantity'],
                    'yield_unit': recipe_data['yield_unit'],
                    'description': recipe_data['description'],
                }
            )
            if created:
                created_count += 1
                msg = f'✅ {recipe.name} criada'
                self.stdout.write(self.style.SUCCESS(msg))

        self.stdout.write(
            self.style.SUCCESS(
                f'✅ {created_count} receitas adicionadas ao banco!'
            )
        )
