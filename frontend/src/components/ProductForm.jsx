import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    cost_price: '',
    profit_margin: ''
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEditing) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get(`/products/${id}/`)
      // const product = response.data

      // Dados simulados por enquanto
      const mockProduct = {
        id: parseInt(id),
        name: 'Bolo de Chocolate',
        description: 'Delicioso bolo de chocolate com cobertura',
        price: 25.00,
        cost_price: 12.50,
        profit_margin: 50.0
      }

      setFormData({
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price.toString(),
        cost_price: mockProduct.cost_price.toString(),
        profit_margin: mockProduct.profit_margin.toString()
      })
    } catch (error) {
      console.error('Erro ao carregar produto:', error)
      alert('Erro ao carregar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Calcular margem de lucro automaticamente quando preço ou custo mudam
    if (name === 'price' || name === 'cost_price') {
      const price = name === 'price' ? parseFloat(value) || 0 : parseFloat(formData.price) || 0
      const cost = name === 'cost_price' ? parseFloat(value) || 0 : parseFloat(formData.cost_price) || 0

      if (cost > 0) {
        const margin = ((price - cost) / cost) * 100
        setFormData(prev => ({
          ...prev,
          profit_margin: margin.toFixed(2)
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        cost_price: parseFloat(formData.cost_price),
        profit_margin: parseFloat(formData.profit_margin)
      }

      if (isEditing) {
        // TODO: Implementar chamada para API Django
        // await api.put(`/products/${id}/`, productData)
        console.log('Produto atualizado:', productData)
      } else {
        // TODO: Implementar chamada para API Django
        // await api.post('/products/', productData)
        console.log('Produto criado:', productData)
      }

      navigate('/products')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informações do Produto
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Preencha os dados do produto.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700">
                    Custo (R$) *
                  </label>
                  <input
                    type="number"
                    name="cost_price"
                    id="cost_price"
                    step="0.01"
                    min="0"
                    required
                    value={formData.cost_price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="profit_margin" className="block text-sm font-medium text-gray-700">
                    Margem de Lucro (%)
                  </label>
                  <input
                    type="number"
                    name="profit_margin"
                    id="profit_margin"
                    step="0.01"
                    readOnly
                    value={formData.profit_margin}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm