import React from 'react'

const CostResults = ({
    margemLucro,
    setMargemLucro,
    margemOptions,
    custoTotal,
    custoPorUnidade,
    precoSugerido,
    lucroEstimado,
    recipeName,
    rendimento,
    custoIngredientes,
    custoEmbalagem,
    formatBRL
}) => {
    return (
        <div className="space-y-space-3 animate-in">
            {/* Card: Margem de Lucro */}
            <div className="card-accent">
                <label className="label uppercase tracking-widest text-xs">
                    💰 Margem de Lucro ({margemLucro}%)
                </label>
                <select
                    value={margemLucro}
                    onChange={(e) => setMargemLucro(Number(e.target.value))}
                    className="select"
                >
                    {margemOptions.map(margem => (
                        <option key={margem} value={margem}>
                            {margem}% de margem
                        </option>
                    ))}
                </select>
            </div>

            {/* Card: Resumo de Custos (Hero Card) */}
            <div className="rounded bg-gradient-to-br from-doce-primary to-doce-accent p-space-4 text-white shadow-medium">
                <h3 className="text-xl font-display font-bold mb-space-3 uppercase tracking-wide">
                    💳 Custos
                </h3>

                <div className="space-y-space-2">
                    {/* Custo Total */}
                    <div className="bg-white/20 rounded p-space-2 backdrop-blur">
                        <p className="text-xs font-medium text-white/90">Custo Total da Receita</p>
                        <p className="text-2xl font-bold font-mono mt-1">{formatBRL(custoTotal)}</p>
                    </div>

                    {/* Custo por Unidade */}
                    <div className="bg-white/20 rounded p-space-2 backdrop-blur">
                        <p className="text-xs font-medium text-white/90">Custo por Unidade</p>
                        <p className="text-2xl font-bold font-mono mt-1">{formatBRL(custoPorUnidade)}</p>
                    </div>

                    {/* Preço Sugerido */}
                    <div className="bg-white/20 rounded p-space-2 backdrop-blur border-2 border-white/40">
                        <p className="text-xs font-medium text-white/90">Preço Sugerido de Venda</p>
                        <p className="text-2xl font-bold font-mono mt-1">{formatBRL(precoSugerido)}</p>
                    </div>

                    {/* Lucro Estimado */}
                    <div className="bg-doce-success/30 rounded p-space-2 backdrop-blur border-2 border-doce-success/50">
                        <p className="text-xs font-medium text-white/90">Lucro Estimado por Unidade</p>
                        <p className="text-2xl font-bold font-mono mt-1 text-doce-success">{formatBRL(lucroEstimado)}</p>
                    </div>
                </div>
            </div>

            {/* Card: Resumo Completo */}
            <div className="card bg-gradient-to-br from-doce-secondary to-white">
                <h3 className="text-lg font-display font-bold text-doce-dark mb-space-2 uppercase">
                    📋 Resumo
                </h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Receita:</span>
                        <span className="font-bold text-doce-dark">{recipeName}</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Rendimento:</span>
                        <span className="font-bold font-mono text-doce-dark">{rendimento} un.</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Custo Ingredientes:</span>
                        <span className="font-bold font-mono text-doce-dark">{formatBRL(custoIngredientes)}</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Custo Embalagem:</span>
                        <span className="font-bold font-mono text-status-error">{formatBRL(custoEmbalagem)}</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Custo Total:</span>
                        <span className="font-bold font-mono text-doce-dark">{formatBRL(custoTotal)}</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Custo/Unidade:</span>
                        <span className="font-bold font-mono text-doce-dark">{formatBRL(custoPorUnidade)}</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Margem Aplicada:</span>
                        <span className="font-bold text-doce-primary">{margemLucro}%</span>
                    </div>
                    <div className="flex justify-between border-b border-doce-border pb-2">
                        <span className="text-doce-light">Preço Sugerido:</span>
                        <span className="font-bold font-mono text-doce-success">{formatBRL(precoSugerido)}</span>
                    </div>
                    <div className="flex justify-between pt-2 bg-doce-primary/10 p-space-2 rounded -mx-space-2">
                        <span className="font-bold text-doce-accent">Lucro/Unidade:</span>
                        <span className="font-bold font-mono text-lg text-doce-primary">{formatBRL(lucroEstimado)}</span>
                    </div>
                </div>
            </div>

            {/* Card: Info Dica */}
            <div className="card-accent bg-doce-secondary/50">
                <p className="text-xs text-doce-dark leading-relaxed">
                    <span className="font-bold text-doce-primary">💡 Dica:</span> Todos os valores são calculados automaticamente. Adicione ingredientes, defina quantidades e preços, e escolha a margem de lucro desejada.
                </p>
            </div>
        </div>
    )
}

export default CostResults
