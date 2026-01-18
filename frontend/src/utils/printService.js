export const printRecipe = ({
    recipeName,
    rendimento,
    margemLucro,
    ingredients,
    packaging,
    custoIngredientes,
    custoEmbalagem,
    custoTotal,
    custoPorUnidade,
    precoSugerido,
    lucroEstimado,
    formatBRL
}) => {
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
