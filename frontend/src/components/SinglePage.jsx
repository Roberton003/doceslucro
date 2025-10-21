import React, { useState, useEffect } from 'react'
import logoBrand from '../assets/logo-brand.png'

// Receitas pré-cadastradas com dados de teste
const RECEITAS_PADRAO = [
  {
    id: 1,
    name: 'Bolo de Cenoura',
    rendimento: 10,
    margemLucro: 50,
    packaging: {
      description: 'Caixa individual',
      quantity_used: 1,
      package_size: 50,
      price_per_package: 40.00
    },
    ingredients: [
      { name: 'Cenoura', quantity_used: 300, unit: 'g', price_per_package: 2.50, package_size: 1000 },
      { name: 'Farinha de trigo', quantity_used: 300, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Açúcar', quantity_used: 200, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 3, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Óleo', quantity_used: 150, unit: 'ml', price_per_package: 8.50, package_size: 1000 }
    ]
  },
  {
    id: 2,
    name: 'Brownie',
    rendimento: 12,
    margemLucro: 50,
    packaging: {
      description: 'Caixa pequena',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 75.00
    },
    ingredients: [
      { name: 'Chocolate 70%', quantity_used: 200, unit: 'g', price_per_package: 18.00, package_size: 500 },
      { name: 'Manteiga', quantity_used: 150, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Açúcar', quantity_used: 150, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 3, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Farinha de trigo', quantity_used: 100, unit: 'g', price_per_package: 8.00, package_size: 1000 }
    ]
  },
  {
    id: 3,
    name: 'Quindim',
    rendimento: 10,
    margemLucro: 50,
    packaging: {
      description: 'Caixa de papel',
      quantity_used: 1,
      package_size: 80,
      price_per_package: 48.00
    },
    ingredients: [
      { name: 'Açúcar', quantity_used: 500, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 12, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Manteiga', quantity_used: 50, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Coco ralado', quantity_used: 100, unit: 'g', price_per_package: 7.50, package_size: 500 }
    ]
  },
  {
    id: 4,
    name: 'Pavê',
    rendimento: 8,
    margemLucro: 50,
    packaging: {
      description: 'Pote plástico',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 120.00
    },
    ingredients: [
      { name: 'Biscoito de polvilho', quantity_used: 200, unit: 'g', price_per_package: 4.00, package_size: 500 },
      { name: 'Leite condensado', quantity_used: 395, unit: 'g', price_per_package: 3.00, package_size: 395 },
      { name: 'Creme de leite', quantity_used: 200, unit: 'ml', price_per_package: 4.50, package_size: 500 },
      { name: 'Chocolate', quantity_used: 50, unit: 'g', price_per_package: 18.00, package_size: 500 }
    ]
  },
  {
    id: 5,
    name: 'Brigadeiro',
    rendimento: 24,
    margemLucro: 50,
    packaging: {
      description: 'Papel de brigadeiro',
      quantity_used: 1,
      package_size: 500,
      price_per_package: 125.00
    },
    ingredients: [
      { name: 'Leite condensado', quantity_used: 395, unit: 'g', price_per_package: 3.00, package_size: 395 },
      { name: 'Chocolate em pó', quantity_used: 50, unit: 'g', price_per_package: 6.00, package_size: 200 },
      { name: 'Manteiga', quantity_used: 30, unit: 'g', price_per_package: 8.00, package_size: 500 }
    ]
  },
  {
    id: 6,
    name: 'Pastel de Nata',
    rendimento: 12,
    margemLucro: 60,
    packaging: {
      description: 'Caixa de papel',
      quantity_used: 1,
      package_size: 60,
      price_per_package: 54.00
    },
    ingredients: [
      { name: 'Folha de massa folhada', quantity_used: 300, unit: 'g', price_per_package: 12.00, package_size: 500 },
      { name: 'Leite condensado', quantity_used: 200, unit: 'g', price_per_package: 3.00, package_size: 395 },
      { name: 'Gema de ovo', quantity_used: 6, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Canela em pó', quantity_used: 5, unit: 'g', price_per_package: 8.00, package_size: 50 },
      { name: 'Açúcar', quantity_used: 100, unit: 'g', price_per_package: 3.50, package_size: 1000 }
    ]
  },
  {
    id: 7,
    name: 'Bolo de Rolo',
    rendimento: 8,
    margemLucro: 55,
    packaging: {
      description: 'Caixa média',
      quantity_used: 1,
      package_size: 50,
      price_per_package: 55.00
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 300, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Açúcar', quantity_used: 250, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Manteiga', quantity_used: 200, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Ovos', quantity_used: 4, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Goiabada', quantity_used: 200, unit: 'g', price_per_package: 6.00, package_size: 400 },
      { name: 'Essência de baunilha', quantity_used: 10, unit: 'ml', price_per_package: 15.00, package_size: 100 }
    ]
  },
  {
    id: 8,
    name: 'Pudim',
    rendimento: 10,
    margemLucro: 50,
    packaging: {
      description: 'Pote de vidro',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 150.00
    },
    ingredients: [
      { name: 'Leite condensado', quantity_used: 395, unit: 'g', price_per_package: 3.00, package_size: 395 },
      { name: 'Leite integral', quantity_used: 400, unit: 'ml', price_per_package: 4.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 3, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Açúcar (calda)', quantity_used: 100, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Essência de baunilha', quantity_used: 5, unit: 'ml', price_per_package: 15.00, package_size: 100 }
    ]
  },
  {
    id: 9,
    name: 'Bolinho de Chuva',
    rendimento: 20,
    margemLucro: 60,
    packaging: {
      description: 'Saco de papel kraft',
      quantity_used: 1,
      package_size: 500,
      price_per_package: 175.00
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 200, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Açúcar', quantity_used: 150, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 2, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Leite', quantity_used: 200, unit: 'ml', price_per_package: 4.50, package_size: 1000 },
      { name: 'Óleo para fritar', quantity_used: 500, unit: 'ml', price_per_package: 8.50, package_size: 1000 },
      { name: 'Canela em pó', quantity_used: 10, unit: 'g', price_per_package: 8.00, package_size: 50 }
    ]
  },
  {
    id: 10,
    name: 'Sonho de Creme',
    rendimento: 16,
    margemLucro: 65,
    packaging: {
      description: 'Caixa pequena de papel',
      quantity_used: 1,
      package_size: 80,
      price_per_package: 68.00
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 250, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Leite', quantity_used: 300, unit: 'ml', price_per_package: 4.50, package_size: 1000 },
      { name: 'Manteiga', quantity_used: 100, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Ovos', quantity_used: 3, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Creme de leite', quantity_used: 200, unit: 'ml', price_per_package: 4.50, package_size: 500 },
      { name: 'Açúcar granulado', quantity_used: 100, unit: 'g', price_per_package: 3.50, package_size: 1000 }
    ]
  },
  {
    id: 11,
    name: 'Bomba de Chocolate',
    rendimento: 12,
    margemLucro: 70,
    packaging: {
      description: 'Caixa de doces',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 135.00
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 200, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Leite', quantity_used: 250, unit: 'ml', price_per_package: 4.50, package_size: 1000 },
      { name: 'Manteiga', quantity_used: 120, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Ovos', quantity_used: 4, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Chocolate belga 60%', quantity_used: 150, unit: 'g', price_per_package: 25.00, package_size: 500 },
      { name: 'Calda de chocolate', quantity_used: 100, unit: 'ml', price_per_package: 12.00, package_size: 500 }
    ]
  },
  {
    id: 12,
    name: 'Brigadeiro Gourmet',
    rendimento: 30,
    margemLucro: 80,
    packaging: {
      description: 'Papel especial',
      quantity_used: 1,
      package_size: 1000,
      price_per_package: 300.00
    },
    ingredients: [
      { name: 'Leite condensado de qualidade', quantity_used: 395, unit: 'g', price_per_package: 3.50, package_size: 395 },
      { name: 'Chocolate em pó 70%', quantity_used: 80, unit: 'g', price_per_package: 12.00, package_size: 200 },
      { name: 'Manteiga', quantity_used: 50, unit: 'g', price_per_package: 8.00, package_size: 500 },
      { name: 'Essência de baunilha', quantity_used: 5, unit: 'ml', price_per_package: 15.00, package_size: 100 }
    ]
  },
  {
    id: 13,
    name: 'Pão de Mel',
    rendimento: 20,
    margemLucro: 60,
    packaging: {
      description: 'Caixa média de papel',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 95.00
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 400, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Mel', quantity_used: 200, unit: 'g', price_per_package: 15.00, package_size: 500 },
      { name: 'Açúcar', quantity_used: 150, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Ovos', quantity_used: 2, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Chocolate para cobertura', quantity_used: 200, unit: 'g', price_per_package: 18.00, package_size: 500 },
      { name: 'Canela em pó', quantity_used: 8, unit: 'g', price_per_package: 8.00, package_size: 50 },
      { name: 'Cravo-da-índia', quantity_used: 5, unit: 'g', price_per_package: 10.00, package_size: 50 }
    ]
  },
  {
    id: 14,
    name: 'Cannoli Siciliano',
    rendimento: 16,
    margemLucro: 75,
    packaging: {
      description: 'Caixa decorada',
      quantity_used: 1,
      package_size: 50,
      price_per_package: 62.50
    },
    ingredients: [
      { name: 'Farinha de trigo', quantity_used: 300, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Vinho tinto', quantity_used: 100, unit: 'ml', price_per_package: 12.00, package_size: 750 },
      { name: 'Ovos', quantity_used: 1, unit: 'un', price_per_package: 12.00, package_size: 12 },
      { name: 'Ricota fresca', quantity_used: 400, unit: 'g', price_per_package: 15.00, package_size: 500 },
      { name: 'Açúcar de confeiteiro', quantity_used: 200, unit: 'g', price_per_package: 5.00, package_size: 500 },
      { name: 'Chocolate em lascas', quantity_used: 100, unit: 'g', price_per_package: 20.00, package_size: 500 },
      { name: 'Óleo para fritar', quantity_used: 800, unit: 'ml', price_per_package: 8.50, package_size: 1000 }
    ]
  },
  {
    id: 15,
    name: 'Geleia Caseira',
    rendimento: 6,
    margemLucro: 120,
    packaging: {
      description: 'Pote de vidro 250ml',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 180.00
    },
    ingredients: [
      { name: 'Fruta (morango/amora)', quantity_used: 1000, unit: 'g', price_per_package: 10.00, package_size: 1000 },
      { name: 'Açúcar', quantity_used: 800, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Suco de limão', quantity_used: 50, unit: 'ml', price_per_package: 3.00, package_size: 500 }
    ]
  },
  {
    id: 16,
    name: 'Compota de Frutas',
    rendimento: 8,
    margemLucro: 100,
    packaging: {
      description: 'Pote de vidro 300ml',
      quantity_used: 1,
      package_size: 100,
      price_per_package: 170.00
    },
    ingredients: [
      { name: 'Fruta (maçã/pêra/pêssego)', quantity_used: 1000, unit: 'g', price_per_package: 8.00, package_size: 1000 },
      { name: 'Açúcar', quantity_used: 500, unit: 'g', price_per_package: 3.50, package_size: 1000 },
      { name: 'Canela em pau', quantity_used: 2, unit: 'un', price_per_package: 12.00, package_size: 20 },
      { name: 'Cravo-da-índia', quantity_used: 5, unit: 'g', price_per_package: 10.00, package_size: 50 }
    ]
  }
]

// Função para formatar como BRL
const formatBRL = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const SinglePage = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(1)
  const [recipeName, setRecipeName] = useState('Bolo de Cenoura')
  const [ingredients, setIngredients] = useState([])
  const [rendimento, setRendimento] = useState(10)
  const [margemLucro, setMargemLucro] = useState(50)
  const [packaging, setPackaging] = useState({
    description: 'Caixa individual',
    quantity_used: 1,
    package_size: 50,
    price_per_package: 40.00
  })
  const [errors, setErrors] = useState({})

  // Adicionar nova receita
  const handleAddNewRecipe = () => {
    const newRecipeId = Math.max(...RECEITAS_PADRAO.map(r => r.id), 0) + 1
    const newRecipe = {
      id: newRecipeId,
      name: 'Nova Receita',
      rendimento: 1,
      margemLucro: 50,
      packaging: {
        description: '',
        quantity_used: 1,
        package_size: 50,
        price_per_package: 0
      },
      ingredients: []
    }
    RECEITAS_PADRAO.push(newRecipe)
    setSelectedRecipeId(newRecipeId)
    setRecipeName('Nova Receita')
    setIngredients([])
    setRendimento(1)
    setMargemLucro(50)
    setPackaging({ description: '', quantity_used: 1, package_size: 50, price_per_package: 0 })
    setErrors({})
  }

  // Carregar receita selecionada
  useEffect(() => {
    const recipe = RECEITAS_PADRAO.find(r => r.id === selectedRecipeId)
    if (recipe) {
      setRecipeName(recipe.name)
      setIngredients([...recipe.ingredients])
      setRendimento(recipe.rendimento)
      setMargemLucro(recipe.margemLucro)
      setPackaging({ ...recipe.packaging })
      setErrors({})
    }
  }, [selectedRecipeId])

  // Validar ingredientes
  const validateIngredients = () => {
    const newErrors = {}
    ingredients.forEach((ing, idx) => {
      if (!ing.name.trim()) {
        newErrors[`name-${idx}`] = 'Nome obrigatório'
      }
      if (ing.quantity_used <= 0) {
        newErrors[`quantity_used-${idx}`] = 'Quantidade deve ser > 0'
      }
      if (!ing.unit.trim()) {
        newErrors[`unit-${idx}`] = 'Unidade obrigatória'
      }
      if (ing.price_per_package < 0) {
        newErrors[`price-${idx}`] = 'Preço não pode ser negativo'
      }
      if (ing.package_size <= 0) {
        newErrors[`package_size-${idx}`] = 'Tamanho do pacote deve ser > 0'
      }
    })
    if (!rendimento || rendimento <= 0) {
      newErrors['rendimento'] = 'Rendimento obrigatório e deve ser > 0'
    }
    if (!packaging.description.trim()) {
      newErrors['packaging_description'] = 'Descrição da embalagem obrigatória'
    }
    if (packaging.quantity_used <= 0) {
      newErrors['packaging_quantity'] = 'Quantidade de embalagem deve ser > 0'
    }
    if (packaging.package_size <= 0) {
      newErrors['packaging_package_size'] = 'Tamanho do pacote deve ser > 0'
    }
    if (packaging.price_per_package < 0) {
      newErrors['packaging_price'] = 'Preço não pode ser negativo'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Adicionar novo ingrediente
  const handleAddIngredient = () => {
    const newIngredient = {
      name: '',
      quantity_used: 0,
      unit: 'g',
      price_per_package: 0,
      package_size: 1000
    }
    setIngredients([...ingredients, newIngredient])
  }

  // Remover ingrediente
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  // Atualizar ingrediente
  const handleUpdateIngredient = (index, field, value) => {
    const updated = [...ingredients]
    updated[index] = { 
      ...updated[index], 
      [field]: (field === 'quantity_used' || field === 'price_per_package' || field === 'package_size') ? Number(value) : value 
    }
    setIngredients(updated)
    // Limpar erro do campo quando o usuário edita
    if (errors[`${field}-${index}`]) {
      const newErrors = { ...errors }
      delete newErrors[`${field}-${index}`]
      setErrors(newErrors)
    }
  }

  // Cálculos - Preço = (Quantidade Usada / Tamanho do Pacote) * Preço do Pacote
  const custoIngredientes = ingredients.reduce((sum, ing) => sum + ((ing.quantity_used / ing.package_size) * ing.price_per_package), 0)
  const custoEmbalagem = (packaging.quantity_used / packaging.package_size) * packaging.price_per_package
  const custoTotal = custoIngredientes + custoEmbalagem
  const custoPorUnidade = rendimento > 0 ? custoTotal / rendimento : 0
  const margemFator = 1 + (margemLucro / 100)
  const precoSugerido = custoPorUnidade * margemFator
  const lucroEstimado = precoSugerido - custoPorUnidade

  const handleSaveRecipe = () => {
    if (validateIngredients()) {
      alert('✅ Receita salva com sucesso!')
    }
  }

  const handleClearRecipe = () => {
    const recipe = RECEITAS_PADRAO.find(r => r.id === selectedRecipeId)
    if (recipe && window.confirm('Restaurar receita original?')) {
      setRecipeName(recipe.name)
      setIngredients([...recipe.ingredients])
      setRendimento(recipe.rendimento)
      setMargemLucro(recipe.margemLucro)
      setPackaging({ ...recipe.packaging })
      setErrors({})
    }
  }

  // Função para imprimir orçamento
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    const ingredients_html = ingredients.map(ing => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${ing.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${ing.quantity_used} ${ing.unit}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${formatBRL(ing.price_per_package)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${ing.package_size}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">${formatBRL((ing.quantity_used / ing.package_size) * ing.price_per_package)}</td>
      </tr>
    `).join('')
    
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Orçamento - ${recipeName}</title>
        <style>
          body {
            font-family: 'Georgia', serif;
            padding: 20px;
            background-color: #fafafa;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #78350f;
            text-align: center;
            font-size: 32px;
            margin-bottom: 10px;
          }
          .subtitle {
            text-align: center;
            color: #92400e;
            font-size: 18px;
            margin-bottom: 30px;
            border-bottom: 2px solid #fcd34d;
            padding-bottom: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #f5deb3;
            padding: 12px;
            text-align: left;
            color: #78350f;
            font-weight: bold;
            border-bottom: 2px solid #daa520;
          }
          .results {
            background-color: #fffbeb;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #f59e0b;
          }
          .result-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #fce7b8;
            color: #78350f;
          }
          .result-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
            padding-top: 15px;
            margin-top: 10px;
            border-top: 2px solid #fcd34d;
          }
          .label {
            font-weight: 600;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            color: #92400e;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
          @media print {
            body {
              background-color: white;
              padding: 0;
            }
            .container {
              box-shadow: none;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>☕ Doces Lucros Luz</h1>
          <div class="subtitle">Orçamento de Custos e Margem de Lucro</div>
          
          <div style="margin-bottom: 20px; padding: 15px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 4px;">
            <strong style="color: #166534;">Receita:</strong> ${recipeName}<br>
            <strong style="color: #166534;">Rendimento:</strong> ${rendimento} unidades<br>
            <strong style="color: #166534;">Margem de Lucro:</strong> ${margemLucro}%
          </div>

          <h2 style="color: #78350f; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">📦 Ingredientes</h2>
          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th style="text-align: center;">Quantidade Usada</th>
                <th style="text-align: right;">Preço Pacote</th>
                <th style="text-align: center;">Tamanho Pacote</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${ingredients_html}
            </tbody>
          </table>

          <h2 style="color: #78350f; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">📦 Embalagem</h2>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th style="text-align: center;">Qtd. Usada</th>
                <th style="text-align: center;">Tam. Pacote</th>
                <th style="text-align: right;">Preço Pacote</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${packaging.description}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${packaging.quantity_used}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${packaging.package_size}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${formatBRL(packaging.price_per_package)}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">${formatBRL(custoEmbalagem)}</td>
              </tr>
            </tbody>
          </table>

          <div class="results">
            <div class="result-row">
              <span class="label">Custo Ingredientes:</span>
              <span>${formatBRL(custoIngredientes)}</span>
            </div>
            <div class="result-row">
              <span class="label">Custo Embalagem:</span>
              <span>${formatBRL(custoEmbalagem)}</span>
            </div>
            <div class="result-row">
              <span class="label">Custo Total da Receita:</span>
              <span>${formatBRL(custoTotal)}</span>
            </div>
            <div class="result-row">
              <span class="label">Custo por Unidade:</span>
              <span>${formatBRL(custoPorUnidade)}</span>
            </div>
            <div class="result-row">
              <span class="label">Preço Sugerido de Venda:</span>
              <span>${formatBRL(precoSugerido)}</span>
            </div>
            <div class="result-row">
              <span class="label">Lucro Estimado por Unidade:</span>
              <span style="color: #16a34a; font-weight: bold;">${formatBRL(lucroEstimado)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Documento gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
            <p>Sistema: Calculadora de Custos - Doces Lucros Luz</p>
          </div>
        </div>
      </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  // Opções de margem
  const margemOptions = Array.from({ length: 21 }, (_, i) => 50 + i * 10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          {/* Imagem no lado esquerdo */}
          <div className="flex-shrink-0">
            <img 
              src={logoBrand} 
              alt="Doces Lucros Luz" 
              className="h-24 md:h-32 w-auto rounded-lg shadow-md hover:shadow-lg transition"
            />
          </div>
          
          {/* Título e descrição no centro */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-900 to-orange-700 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              ☕ Doces Lucros Luz
            </h1>
            <p className="text-base md:text-lg text-amber-800 font-medium">Calculadora de Custos e Margem de Lucro</p>
          </div>
          
          {/* Botão no lado direito */}
          <button
            onClick={handlePrint}
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 whitespace-nowrap flex-shrink-0"
          >
            <span>🖨️</span>
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* PAINEL ESQUERDO - INPUTS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card: Seletor e Nome de Receita em Um */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-orange-400 hover:shadow-xl transition" style={{ borderRadius: '12px', boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <label className="block text-xs md:text-sm font-bold text-amber-900 mb-4 uppercase tracking-widest">
                📌 Receita
              </label>
              
              <div className="flex gap-3">
                {/* Dropdown Recipes (Hidden visually, used for data) */}
                <select
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(Number(e.target.value))}
                  className="hidden"
                >
                  {RECEITAS_PADRAO.map(recipe => (
                    <option key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </option>
                  ))}
                </select>

                {/* Nome da Receita Editável - Campo Principal */}
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-200 bg-white text-amber-900 font-medium focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                  placeholder="Escolha sua receita..."
                />

                {/* Botão de Opções com Dropdown */}
                <div className="relative group">
                  <button className="px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 text-sm md:text-base">
                    ▼
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-amber-200 z-10 hidden group-hover:block">
                    {RECEITAS_PADRAO.map(recipe => (
                      <button
                        key={recipe.id}
                        onClick={() => {
                          setSelectedRecipeId(recipe.id)
                          setRecipeName(recipe.name)
                        }}
                        className="w-full text-left px-4 py-3 text-amber-900 font-medium hover:bg-amber-50 transition first:rounded-t-lg"
                      >
                        {recipe.name}
                      </button>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-amber-200"></div>
                    
                    {/* Botão Adicionar Receita */}
                    <button
                      onClick={handleAddNewRecipe}
                      className="w-full text-left px-4 py-3 text-green-700 font-bold hover:bg-green-50 transition rounded-b-lg flex items-center gap-2"
                    >
                      ➕ Adicionar Receita
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Rendimento */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-blue-300 hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <label className="block text-xs md:text-sm font-bold text-amber-900 mb-3 uppercase tracking-widest">
                🎯 Rendimento (unidades produzidas) {errors['rendimento'] && <span className="text-red-600 text-xs ml-2">❌ {errors['rendimento']}</span>}
              </label>
              <input
                type="number"
                value={rendimento}
                onChange={(e) => {
                  setRendimento(Number(e.target.value))
                  if (errors['rendimento']) {
                    const newErrors = { ...errors }
                    delete newErrors['rendimento']
                    setErrors(newErrors)
                  }
                }}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-amber-900 font-medium focus:outline-none focus:ring-2 transition ${
                  errors['rendimento'] 
                    ? 'border-red-400 focus:border-red-600 focus:ring-red-200' 
                    : 'border-blue-200 focus:border-orange-400 focus:ring-orange-100'
                }`}
                placeholder="Ex: 10"
                min="1"
              />
            </div>

            {/* Card: Embalagem */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-rose-300 hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <label className="block text-xs md:text-sm font-bold text-amber-900 mb-4 uppercase tracking-widest">
                📦 Embalagem por Unidade (Modelo Pacote)
              </label>
              
              <div className="space-y-3">
                {/* Descrição */}
                <div>
                  <label className="text-xs md:text-sm text-amber-800 font-semibold mb-1 block">Tipo/Descrição {errors['packaging_description'] && <span className="text-red-600 text-xs">❌ {errors['packaging_description']}</span>}</label>
                  <input
                    type="text"
                    value={packaging.description}
                    onChange={(e) => {
                      setPackaging({ ...packaging, description: e.target.value })
                      if (errors['packaging_description']) {
                        const newErrors = { ...errors }
                        delete newErrors['packaging_description']
                        setErrors(newErrors)
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-xs md:text-sm ${
                      errors['packaging_description']
                        ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                        : 'border-rose-200 focus:border-orange-400 focus:ring-orange-100'
                    }`}
                    placeholder="Ex: Caixa individual, Pote de vidro..."
                  />
                </div>

                {/* Quantidade Usada e Tamanho do Pacote */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Quantidade Usada */}
                  <div>
                    <label className="text-xs md:text-sm text-amber-800 font-semibold mb-1 block">Qtd. Usada {errors['packaging_quantity'] && <span className="text-red-600 text-xs">❌</span>}</label>
                    <input
                      type="number"
                      value={packaging.quantity_used}
                      onChange={(e) => {
                        setPackaging({ ...packaging, quantity_used: Number(e.target.value) })
                        if (errors['packaging_quantity']) {
                          const newErrors = { ...errors }
                          delete newErrors['packaging_quantity']
                          setErrors(newErrors)
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-xs md:text-sm text-center ${
                        errors['packaging_quantity']
                          ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                          : 'border-rose-200 focus:border-orange-400 focus:ring-orange-100'
                      }`}
                      placeholder="1"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Tamanho do Pacote */}
                  <div>
                    <label className="text-xs md:text-sm text-amber-800 font-semibold mb-1 block">Tamanho Pacote {errors['packaging_package_size'] && <span className="text-red-600 text-xs">❌</span>}</label>
                    <input
                      type="number"
                      value={packaging.package_size}
                      onChange={(e) => {
                        setPackaging({ ...packaging, package_size: Number(e.target.value) })
                        if (errors['packaging_package_size']) {
                          const newErrors = { ...errors }
                          delete newErrors['packaging_package_size']
                          setErrors(newErrors)
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-xs md:text-sm text-center ${
                        errors['packaging_package_size']
                          ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                          : 'border-rose-200 focus:border-orange-400 focus:ring-orange-100'
                      }`}
                      placeholder="50"
                      step="0.01"
                      min="1"
                    />
                  </div>
                </div>

                {/* Preço do Pacote */}
                <div>
                  <label className="text-xs md:text-sm text-amber-800 font-semibold mb-1 block">Preço do Pacote {errors['packaging_price'] && <span className="text-red-600 text-xs">❌ {errors['packaging_price']}</span>}</label>
                  <input
                    type="number"
                    value={packaging.price_per_package}
                    onChange={(e) => {
                      setPackaging({ ...packaging, price_per_package: Number(e.target.value) })
                      if (errors['packaging_price']) {
                        const newErrors = { ...errors }
                        delete newErrors['packaging_price']
                        setErrors(newErrors)
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-xs md:text-sm text-right ${
                      errors['packaging_price']
                        ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                        : 'border-rose-200 focus:border-orange-400 focus:ring-orange-100'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                {/* Resumo de Custo */}
                <div className="mt-3 pt-3 border-t border-rose-200 bg-rose-50 rounded-lg p-3 space-y-2">
                  <p className="text-xs md:text-sm text-amber-900">
                    <strong>Fórmula:</strong> (Qtd. Usada ÷ Tamanho Pacote) × Preço Pacote
                  </p>
                  <p className="text-xs md:text-sm text-amber-900">
                    <strong>({packaging.quantity_used} ÷ {packaging.package_size}) × {formatBRL(packaging.price_per_package)} = </strong><span className="text-rose-600 font-bold text-base">{formatBRL(custoEmbalagem)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Tabela de Ingredientes */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-orange-400 hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-amber-900">📦 Ingredientes</h2>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleAddIngredient}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 text-sm md:text-base"
                  >
                    ➕ Adicionar
                  </button>
                  <button
                    onClick={handleClearRecipe}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-semibold hover:shadow-lg transition duration-200 text-sm md:text-base"
                  >
                    🔄 Restaurar
                  </button>
                </div>
              </div>

              {/* Tabela Responsiva */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                      <th className="text-left py-3 px-2 md:px-4 text-amber-900 font-bold">Ingrediente</th>
                      <th className="text-center py-3 px-2 md:px-4 text-amber-900 font-bold">Qtd Usada</th>
                      <th className="text-center py-3 px-2 md:px-4 text-amber-900 font-bold">Un.</th>
                      <th className="text-center py-3 px-2 md:px-4 text-amber-900 font-bold">Tamanho Pacote</th>
                      <th className="text-right py-3 px-2 md:px-4 text-amber-900 font-bold">Preço Pacote</th>
                      <th className="text-right py-3 px-2 md:px-4 text-amber-900 font-bold">Total</th>
                      <th className="text-center py-3 px-2 md:px-4 text-amber-900 font-bold">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient, index) => (
                      <tr key={index} className="border-b border-amber-100 hover:bg-amber-50 transition">
                        <td className="py-3 px-2 md:px-4">
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => handleUpdateIngredient(index, 'name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-xs md:text-sm ${
                              errors[`name-${index}`]
                                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                                : 'border-amber-200 focus:border-orange-400 focus:ring-orange-100'
                            }`}
                            placeholder="Nome"
                          />
                          {errors[`name-${index}`] && <p className="text-red-600 text-xs mt-1">❌ {errors[`name-${index}`]}</p>}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <input
                            type="number"
                            value={ingredient.quantity_used}
                            onChange={(e) => handleUpdateIngredient(index, 'quantity_used', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-center text-xs md:text-sm ${
                              errors[`quantity_used-${index}`]
                                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                                : 'border-amber-200 focus:border-orange-400 focus:ring-orange-100'
                            }`}
                            placeholder="0"
                            step="0.01"
                          />
                          {errors[`quantity_used-${index}`] && <p className="text-red-600 text-xs mt-1">❌ {errors[`quantity_used-${index}`]}</p>}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <select
                            value={ingredient.unit}
                            onChange={(e) => handleUpdateIngredient(index, 'unit', e.target.value)}
                            style={{
                              color: '#78350f',
                              backgroundColor: '#ffffff',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              padding: '10px 12px',
                              border: '2px solid #fcd34d',
                              borderRadius: '8px'
                            }}
                          >
                            <option value="" style={{ color: '#78350f' }}>-</option>
                            <option value="g" style={{ color: '#78350f' }}>g</option>
                            <option value="ml" style={{ color: '#78350f' }}>ml</option>
                            <option value="un" style={{ color: '#78350f' }}>un</option>
                            <option value="kg" style={{ color: '#78350f' }}>kg</option>
                            <option value="l" style={{ color: '#78350f' }}>l</option>
                          </select>
                          {errors[`unit-${index}`] && <p className="text-red-600 text-xs mt-1">❌ {errors[`unit-${index}`]}</p>}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <input
                            type="number"
                            value={ingredient.package_size}
                            onChange={(e) => handleUpdateIngredient(index, 'package_size', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-center text-xs md:text-sm ${
                              errors[`package_size-${index}`]
                                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                                : 'border-amber-200 focus:border-orange-400 focus:ring-orange-100'
                            }`}
                            placeholder="1000"
                            step="0.01"
                          />
                          {errors[`package_size-${index}`] && <p className="text-red-600 text-xs mt-1">❌ {errors[`package_size-${index}`]}</p>}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <input
                            type="number"
                            value={ingredient.price_per_package}
                            onChange={(e) => handleUpdateIngredient(index, 'price_per_package', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-right text-xs md:text-sm ${
                              errors[`price-${index}`]
                                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                                : 'border-amber-200 focus:border-orange-400 focus:ring-orange-100'
                            }`}
                            placeholder="0.00"
                            step="0.01"
                          />
                          {errors[`price-${index}`] && <p className="text-red-600 text-xs mt-1">❌ {errors[`price-${index}`]}</p>}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-right font-semibold text-amber-900 text-xs md:text-sm">
                          {formatBRL((ingredient.quantity_used / ingredient.package_size) * ingredient.price_per_package)}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-center">
                          <button
                            onClick={() => handleRemoveIngredient(index)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold hover:scale-110 transform"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ingredients.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">Nenhum ingrediente adicionado. Clique em "+ Adicionar" para começar.</p>
                </div>
              )}

              <div className="mt-6 flex gap-4 flex-col md:flex-row">
                <button
                  onClick={handleSaveRecipe}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition duration-200 text-sm md:text-base"
                >
                  💾 Salvar Receita
                </button>
              </div>
            </div>
          </div>

          {/* PAINEL DIREITO - CÁLCULOS E RESULTADOS */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card: Margem de Lucro */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-orange-500 hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <label className="block text-xs md:text-sm font-bold text-amber-900 mb-3 uppercase tracking-widest">
                💰 Margem de Lucro ({margemLucro}%)
              </label>
              <select
                value={margemLucro}
                onChange={(e) => setMargemLucro(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 bg-white text-amber-900 font-medium focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              >
                {margemOptions.map(margem => (
                  <option key={margem} value={margem}>
                    {margem}% de margem
                  </option>
                ))}
              </select>
            </div>

            {/* Card: Resumo de Custos */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-md p-6 md:p-8 text-white border-l-4 border-white hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.15)' }}>
              <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>💳 Custos</h3>

              <div className="space-y-4">
                {/* Custo Total */}
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <p className="text-xs md:text-sm font-medium text-white text-opacity-90">Custo Total da Receita</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{formatBRL(custoTotal)}</p>
                </div>

                {/* Custo por Unidade */}
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <p className="text-xs md:text-sm font-medium text-white text-opacity-90">Custo por Unidade</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{formatBRL(custoPorUnidade)}</p>
                </div>

                {/* Preço Sugerido */}
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur border-2 border-white border-opacity-40">
                  <p className="text-xs md:text-sm font-medium text-white text-opacity-90">Preço Sugerido de Venda</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{formatBRL(precoSugerido)}</p>
                </div>

                {/* Lucro Estimado */}
                <div className="bg-yellow-300 bg-opacity-30 rounded-xl p-4 backdrop-blur border-2 border-yellow-300 border-opacity-50">
                  <p className="text-xs md:text-sm font-medium text-white text-opacity-90">Lucro Estimado por Unidade</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 text-yellow-50">{formatBRL(lucroEstimado)}</p>
                </div>
              </div>
            </div>

            {/* Card: Resumo Completo */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-md p-6 md:p-8 border-l-4 border-orange-400 hover:shadow-xl transition" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)' }}>
              <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-4 uppercase" style={{ fontFamily: "'Georgia', serif" }}>📋 Resumo</h3>
              
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Receita:</span>
                  <span className="text-amber-900 font-bold">{recipeName}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Rendimento:</span>
                  <span className="text-amber-900 font-bold">{rendimento} un.</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Custo Ingredientes:</span>
                  <span className="text-amber-900 font-bold">{formatBRL(custoIngredientes)}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Custo Embalagem:</span>
                  <span className="text-rose-600 font-bold">{formatBRL(custoEmbalagem)}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Custo Total:</span>
                  <span className="text-amber-900 font-bold">{formatBRL(custoTotal)}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Custo/Unidade:</span>
                  <span className="text-amber-900 font-bold">{formatBRL(custoPorUnidade)}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Margem Aplicada:</span>
                  <span className="text-orange-600 font-bold">{margemLucro}%</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="text-amber-800 font-medium">Preço Sugerido:</span>
                  <span className="text-green-700 font-bold">{formatBRL(precoSugerido)}</span>
                </div>
                <div className="flex justify-between pt-2 bg-orange-100 p-3 rounded-lg">
                  <span className="text-amber-800 font-bold">Lucro/Unidade:</span>
                  <span className="text-orange-700 font-bold text-lg">{formatBRL(lucroEstimado)}</span>
                </div>
              </div>
            </div>

            {/* Card: Info Dica */}
            <div className="bg-amber-50 rounded-2xl shadow-md p-6 border-l-4 border-orange-400" style={{ boxShadow: '0 4px 6px rgba(139, 69, 19, 0.08)' }}>
              <p className="text-xs md:text-sm text-amber-900 leading-relaxed">
                <span className="font-bold text-orange-700">💡 Dica:</span> Todos os valores são calculados automaticamente. Adicione ingredientes, defina quantidades e preços, e escolha a margem de lucro desejada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
