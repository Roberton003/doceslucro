import React from 'react'

const RecipeSelector = ({
    recipes,
    selectedRecipeId,
    onSelectRecipe,
    recipeName,
    onNameChange,
    onAddRecipe
}) => {
    return (
        <div className="card-gourmet">
            <label className="label uppercase tracking-widest text-doce-terracotta font-bold">
                📌 Receita
            </label>

            <div className="flex gap-3">
                {/* Dropdown Recipes (Hidden visually, used for data sync if needed strictly) */}
                <select
                    value={selectedRecipeId}
                    onChange={(e) => onSelectRecipe(Number(e.target.value))}
                    className="hidden"
                >
                    {recipes.map(recipe => (
                        <option key={recipe.id} value={recipe.id}>
                            {recipe.name}
                        </option>
                    ))}
                </select>

                {/* Nome da Receita Editável - Campo Principal */}
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="flex-1 input"
                    placeholder="Escolha sua receita..."
                />

                {/* Botão de Opções com Dropdown */}
                <div className="relative group">
                    <button className="btn-terracotta px-4 py-3 rounded-xl text-sm md:text-base">
                        ▼
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card hover:shadow-card-hover border border-doce-border/20 z-10 hidden group-hover:block transition-all duration-300">
                        {recipes.map(recipe => (
                            <button
                                key={recipe.id}
                                onClick={() => onSelectRecipe(recipe.id)}
                                className="w-full text-left px-4 py-3 text-doce-dark font-medium hover:bg-doce-cream transition first:rounded-t-lg"
                            >
                                {recipe.name}
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="border-t border-doce-border/20"></div>

                        {/* Botão Adicionar Receita */}
                        <button
                            onClick={onAddRecipe}
                            className="w-full text-left px-4 py-3 text-doce-primary font-bold hover:bg-doce-cream/50 transition rounded-b-lg flex items-center gap-2"
                        >
                            ➕ Adicionar Receita
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeSelector
