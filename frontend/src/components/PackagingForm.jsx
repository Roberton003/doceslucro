import React from 'react'

const PackagingForm = ({ packaging, errors, onUpdatePackaging, formatBRL }) => {
    const custoEmbalagem = (packaging.quantity_used / packaging.package_size) * packaging.price_per_package

    return (
        <div className="card-gourmet">
            <label className="label uppercase tracking-widest text-doce-terracotta font-bold">
                📦 Embalagem por Unidade (Modelo Pacote)
            </label>

            <div className="space-y-3">
                {/* Descrição */}
                <div>
                    <label className="label text-doce-terracotta font-semibold mb-1 block">Tipo/Descrição {errors['packaging_description'] && <span className="text-status-error text-xs">❌ {errors['packaging_description']}</span>}</label>
                    <input
                        type="text"
                        value={packaging.description}
                        onChange={(e) => onUpdatePackaging('description', e.target.value)}
                        className={`input w-full text-xs md:text-sm ${errors['packaging_description']
                            ? 'input-error'
                            : ''
                            }`}
                        placeholder="Ex: Caixa individual, Pote de vidro..."
                    />
                </div>

                {/* Quantidade Usada e Tamanho do Pacote */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Quantidade Usada */}
                    <div>
                        <label className="label text-doce-terracotta font-semibold mb-1 block">Qtd. Usada {errors['packaging_quantity'] && <span className="text-status-error text-xs">❌</span>}</label>
                        <input
                            type="number"
                            value={packaging.quantity_used}
                            onChange={(e) => onUpdatePackaging('quantity_used', e.target.value)}
                            className={`input w-full text-xs md:text-sm text-center ${errors['packaging_quantity']
                                ? 'input-error'
                                : ''
                                }`}
                            placeholder="1"
                            step="0.01"
                            min="0"
                        />
                    </div>

                    {/* Tamanho do Pacote */}
                    <div>
                        <label className="label text-doce-terracotta font-semibold mb-1 block">Tamanho Pacote {errors['packaging_package_size'] && <span className="text-status-error text-xs">❌</span>}</label>
                        <input
                            type="number"
                            value={packaging.package_size}
                            onChange={(e) => onUpdatePackaging('package_size', e.target.value)}
                            className={`input w-full text-xs md:text-sm text-center ${errors['packaging_package_size']
                                ? 'input-error'
                                : ''
                                }`}
                            placeholder="50"
                            step="0.01"
                            min="1"
                        />
                    </div>
                </div>

                {/* Preço do Pacote */}
                <div>
                    <label className="label text-doce-terracotta font-semibold mb-1 block">Preço do Pacote {errors['packaging_price'] && <span className="text-status-error text-xs">❌ {errors['packaging_price']}</span>}</label>
                    <input
                        type="number"
                        value={packaging.price_per_package}
                        onChange={(e) => onUpdatePackaging('price_per_package', e.target.value)}
                        className={`input w-full text-xs md:text-sm text-right ${errors['packaging_price']
                            ? 'input-error'
                            : ''
                            }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                    />
                </div>

                {/* Resumo de Custo */}
                <div className="mt-3 pt-3 border-t border-doce-border/20 bg-doce-cream/30 rounded-lg p-3 space-y-2">
                    <p className="text-xs md:text-sm text-doce-dark">
                        <strong>Fórmula:</strong> (Qtd. Usada ÷ Tamanho Pacote) × Preço Pacote
                    </p>
                    <p className="text-xs md:text-sm text-doce-dark">
                        <strong>({packaging.quantity_used} ÷ {packaging.package_size}) × {formatBRL(packaging.price_per_package)} = </strong><span className="text-doce-terracotta font-bold text-base">{formatBRL(custoEmbalagem)}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PackagingForm
