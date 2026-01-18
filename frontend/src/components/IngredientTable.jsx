import React from 'react'

const IngredientTable = ({
    ingredients,
    errors,
    onUpdateIngredient,
    onRemoveIngredient,
    onAddIngredient,
    onSaveRecipe,
    onClearRecipe,
    formatBRL
}) => {
    return (
        <div className="card-gourmet">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-display font-bold text-doce-primary">📦 Ingredientes</h2>
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={onAddIngredient}
                        className="btn-terracotta px-4 py-2 rounded-lg text-sm md:text-base"
                    >
                        ➕ Adicionar
                    </button>
                    <button
                        onClick={onClearRecipe}
                        className="btn-ghost px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm md:text-base"
                    >
                        🔄 Restaurar
                    </button>
                </div>
            </div>

            {/* Tabela Responsiva */}
            <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                    <thead>
                        <tr className="border-b border-doce-border/20 bg-doce-cream">
                            <th className="text-left py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Ingrediente</th>
                            <th className="text-center py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Qtd Usada</th>
                            <th className="text-center py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Un.</th>
                            <th className="text-center py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Tamanho Pacote</th>
                            <th className="text-right py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Preço Pacote</th>
                            <th className="text-right py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Total</th>
                            <th className="text-center py-3 px-2 md:px-4 text-doce-terracotta font-bold uppercase tracking-wider">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient, index) => (
                            <tr key={index} className="border-b border-doce-border/10 hover:bg-doce-cream/30 transition">
                                <td className="py-3 px-2 md:px-4">
                                    <input
                                        type="text"
                                        value={ingredient.name}
                                        onChange={(e) => onUpdateIngredient(index, 'name', e.target.value)}
                                        className={`input w-full text-xs md:text-sm ${errors[`name-${index}`]
                                            ? 'input-error'
                                            : ''
                                            }`}
                                        placeholder="Nome"
                                    />
                                    {errors[`name-${index}`] && <p className="text-status-error text-xs mt-1">❌ {errors[`name-${index}`]}</p>}
                                </td>
                                <td className="py-3 px-2 md:px-4">
                                    <input
                                        type="number"
                                        value={ingredient.quantity_used}
                                        onChange={(e) => onUpdateIngredient(index, 'quantity_used', e.target.value)}
                                        className={`input w-full text-center text-xs md:text-sm ${errors[`quantity_used-${index}`]
                                            ? 'input-error'
                                            : ''
                                            }`}
                                        placeholder="0"
                                        step="0.01"
                                    />
                                    {errors[`quantity_used-${index}`] && <p className="text-status-error text-xs mt-1">❌ {errors[`quantity_used-${index}`]}</p>}
                                </td>
                                <td className="py-3 px-2 md:px-4">
                                    <select
                                        value={ingredient.unit}
                                        onChange={(e) => onUpdateIngredient(index, 'unit', e.target.value)}
                                        className="input w-full py-2 px-1 text-center font-bold text-doce-primary border-doce-terracotta/30 focus:border-doce-terracotta"
                                    >
                                        <option value="">-</option>
                                        <option value="g">g</option>
                                        <option value="ml">ml</option>
                                        <option value="un">un</option>
                                        <option value="kg">kg</option>
                                        <option value="l">l</option>
                                    </select>
                                    {errors[`unit-${index}`] && <p className="text-status-error text-xs mt-1">❌ {errors[`unit-${index}`]}</p>}
                                </td>
                                <td className="py-3 px-2 md:px-4">
                                    <input
                                        type="number"
                                        value={ingredient.package_size}
                                        onChange={(e) => onUpdateIngredient(index, 'package_size', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-center text-xs md:text-sm ${errors[`package_size-${index}`]
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
                                        onChange={(e) => onUpdateIngredient(index, 'price_per_package', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-right text-xs md:text-sm ${errors[`price-${index}`]
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
                                        onClick={() => onRemoveIngredient(index)}
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
                    onClick={onSaveRecipe}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition duration-200 text-sm md:text-base"
                >
                    💾 Salvar Receita
                </button>
            </div>
        </div>
    )
}

export default IngredientTable
