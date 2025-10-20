import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get('/products/')
      // setProducts(response.data)

      // Dados simulados por enquanto
      const mockProducts = [
        {
          id: 1,
          name: 'Bolo de Chocolate',
          description: 'Delicioso bolo de chocolate com cobertura',
          price: 25.00,
          cost_price: 12.50,
          profit_margin: 50.0,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Torta de Morango',
          description: 'Torta fresca com morangos da estação',
          price: 30.00,
          cost_price: 15.00,
          profit_margin: 50.0,
          created_at: '2024-01-14T10:00:00Z'
        },
        {
          id: 3,
          name: 'Cookie de Baunilha',
          description: 'Cookie crocante com gotas de chocolate',
          price: 5.00,
          cost_price: 2.50,
          profit_margin: 50.0,
          created_at: '2024-01-13T10:00:00Z'
        }
      ]
      setProducts(mockProducts)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    try {
      // TODO: Implementar chamada para API Django
      // await api.delete(`/products/${id}/`)
      setProducts(products.filter(product => product.id !== id))
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('Erro ao deletar produto')
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <Link
          to="/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Novo Produto
        </Link>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Products List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="mr-4">
                            Preço: R$ {product.price.toFixed(2)}
                          </span>
                          <span className="mr-4">
                            Custo: R$ {product.cost_price.toFixed(2)}
                          </span>
                          <span>
                            Margem: {product.profit_margin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/products/${product.id}/edit`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'Nenhum produto encontrado para a busca.' : 'Nenhum produto cadastrado.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products