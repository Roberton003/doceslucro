import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const mockIngredients = [
  { id: 1, name: 'Farinha de Trigo', unit: 'kg', cost_per_unit: 5.5 },
  { id: 2, name: 'Açúcar', unit: 'kg', cost_per_unit: 4.2 },
  { id: 3, name: 'Ovos', unit: 'unidade', cost_per_unit: 0.8 },
  { id: 4, name: 'Leite', unit: 'litro', cost_per_unit: 3.5 },
  { id: 5, name: 'Chocolate em Pó', unit: 'kg', cost_per_unit: 15.0 },
  { id: 6, name: 'Manteiga', unit: 'kg', cost_per_unit: 28.0 },
  { id: 7, name: 'Fermento', unit: 'g', cost_per_unit: 0.05 },
  { id: 8, name: 'Sal', unit: 'kg', cost_per_unit: 2.5 }
]

const SinglePage = () => {
  const navigate = useNavigate()
  const [recipeName, setRecipeName] = useState('Minha Receita')
  const [ingredients, setIngredients] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [servings, setServings] = useState(1)

  useEffect(() => {
    calculateTotal()
  }, [ingredients, servings])

  const addRow = () => {
    setIngredients(prev => [...prev, { ingredient_id: '', quantity: '', unit: '', cost: 0 }])
  }

  const removeRow = (idx) => {
    setIngredients(prev => prev.filter((_, i) => i !== idx))
  }

  const updateRow = (idx, field, value) => {
    setIngredients(prev => prev.map((row, i) => {
      if (i !== idx) return row
      const updated = { ...row, [field]: value }
      if (field === 'ingredient_id' || field === 'quantity') {
        const ing = mockIngredients.find(x => String(x.id) === String(updated.ingredient_id))
        const qty = parseFloat(updated.quantity) || 0
        if (ing && qty > 0) {
          updated.unit = ing.unit
          updated.cost = +(qty * ing.cost_per_unit).toFixed(2)
        } else {
          updated.cost = 0
        }
      }
      return updated
    }))
  }

  const calculateTotal = () => {
    const sum = ingredients.reduce((s, r) => s + (parseFloat(r.cost) || 0), 0)
    setTotalCost(+sum.toFixed(2))
  }

  const handleSave = () => {
    alert(`Receita "${recipeName}" salva com sucesso!\nCusto Total: R$ ${totalCost.toFixed(2)}\nCusto por Porção: R$ ${(totalCost / (servings || 1)).toFixed(2)}`)
    setIngredients([])
    setTotalCost(0)
    setServings(1)
  }

  const costPerServing = servings > 0 ? (totalCost / servings).toFixed(2) : '0.00'
  const profitMargin30 = (parseFloat(costPerServing) * 1.3).toFixed(2)
  const profitMargin50 = (parseFloat(costPerServing) * 1.5).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🍰</div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  DoceLucro
                </h1>
                <p className="text-sm text-gray-500">Calculadora inteligente para confeitaria</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/recipes')}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                📋 Minhas Receitas
              </button>
              <button
                onClick={() => navigate('/ingredients')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg transition font-medium"
              >
                🥕 Ingredientes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Calculadora */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Receita</label>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Ingredients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Ingredientes</h2>
              <div className="space-y-3">
                {ingredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhum ingrediente adicionado. Clique em "Adicionar" para começar.</p>
                ) : (
                  ingredients.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <select
                        value={row.ingredient_id}
                        onChange={(e) => updateRow(idx, 'ingredient_id', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                      >
                        <option value="">Selecione ingrediente</option>
                        {mockIngredients.map(ing => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} (R$ {ing.cost_per_unit.toFixed(2)}/{ing.unit})
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Qtd"
                        value={row.quantity}
                        onChange={(e) => updateRow(idx, 'quantity', e.target.value)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                      />

                      <div className="w-16 text-sm font-medium text-gray-600 text-center">{row.unit}</div>
                      <div className="w-24 text-right font-semibold text-gray-900">R$ {(row.cost || 0).toFixed(2)}</div>

                      <button
                        onClick={() => removeRow(idx)}
                        className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition text-sm font-medium"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={addRow}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition font-medium"
              >
                + Adicionar Ingrediente
              </button>
            </div>
          </div>

          {/* Right: Resumo e Cálculos */}
          <div className="space-y-6">
            {/* Porções */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Porções</label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-lg font-semibold"
              />
            </div>

            {/* Custo Total Card */}
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg text-white p-6">
              <p className="text-sm font-medium opacity-90 mb-1">Custo Total da Receita</p>
              <h3 className="text-3xl font-bold">R$ {totalCost.toFixed(2)}</h3>
            </div>

            {/* Custo por Porção */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Custo por Porção</p>
              <h4 className="text-2xl font-bold text-gray-900">R$ {costPerServing}</h4>
              <p className="text-xs text-gray-500 mt-1">÷ {servings} porção{servings !== 1 ? 's' : ''}</p>
            </div>

            {/* Precificação Sugerida */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">💰 Precificação Sugerida</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">+30% margem:</span>
                  <span className="font-bold text-blue-600">R$ {profitMargin30}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">+50% margem:</span>
                  <span className="font-bold text-green-600">R$ {profitMargin50}</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="space-y-3">
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                ✓ Salvar Receita
              </button>
              <button
                onClick={() => {
                  setIngredients([])
                  setTotalCost(0)
                  setServings(1)
                  setRecipeName('Minha Receita')
                }}
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                🔄 Limpar Tudo
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 text-xs text-gray-700">
              <p className="font-medium mb-1">💡 Dica:</p>
              <p>Calcule o custo exato dos seus produtos e sugerir preços competitivos para suas receitas!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SinglePage
