# Santiago Planner

Roadbook autónomo do Caminho de Santiago, pronto para GitHub Pages ou para o bloco **HTML · Embeds** do Notion.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` valida o roadbook e publica-o em cada push para `main`. Também pode ser executado manualmente em **Actions**. Não precisa de build, `npm install`, servidor próprio ou secrets adicionais. O artefacto publicado contém apenas `index.html` e `.nojekyll`; documentos de planeamento, testes e outros ficheiros do repositório não são enviados para o site.

1. Criar ou escolher um repositório GitHub e ligar este checkout ao respetivo remoto (ainda não existe um remoto configurado):

   ```sh
   git remote add origin https://github.com/UTILIZADOR/REPOSITORIO.git
   ```

2. Fazer commit de `index.html`, `check-roadbook.cjs`, `.github/workflows/pages.yml` e `README.md`, e enviar a branch `main` para o GitHub:

   ```sh
   git add index.html check-roadbook.cjs .github/workflows/pages.yml README.md
   git commit -m "Prepare Camino roadbook for GitHub Pages"
   git push -u origin main
   ```

3. No GitHub, abrir **Settings → Pages → Build and deployment → Source** e escolher **GitHub Actions**.
4. Em **Actions**, executar **Publicar roadbook no GitHub Pages → Run workflow** na branch `main` se o primeiro push ocorreu antes de ativar o Pages.
5. Após o workflow terminar, abrir o URL apresentado em **Settings → Pages** ou no deployment `github-pages`. Para um repositório de projeto, é normalmente `https://UTILIZADOR.github.io/REPOSITORIO/`.

O site funciona em subpastas de projetos sem configurar um caminho base. As fontes, o mapa e a meteorologia continuam a precisar de ligação à internet; os gráficos de altimetria estão embebidos. A ativação segue a [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Ficheiro publicável

Toda a aplicação vive em `index.html`:

- estilos dentro de `<style>`;
- plano completo dentro de `<script type="application/json" id="roadbook-data">`;
- renderer e interacções dentro do último `<script>`.

Não existem dependências locais. O ficheiro pode ser aberto directamente num browser ou inserido no bloco HTML do Notion. É necessária ligação à internet para carregar as fontes, os ícones, o Leaflet e os tiles do OpenStreetMap.

A meteorologia consulta a Open-Meteo ao abrir a página e no botão **Atualizar previsão**, para a localidade de chegada e a data exata de cada etapa. Mostra temperatura mínima/máxima, probabilidade e quantidade de precipitação e vento máximo diário. Datas fora da janela de previsão e falhas de ligação são identificadas; os links MeteoGalicia, AEMET e IPMA permitem consultar avisos oficiais. O embed precisa de permitir pedidos à API.

Os contactos incluem chamada direta e fonte oficial. As opções de regresso continuam por decidir: horários, preços e lugares devem ser confirmados para a data escolhida. A checklist divide mochila diária, mala transportada e tarefas antes da partida. As marcações são locais a este browser (`localStorage`), não alteram as decisões do JSON e podem não persistir em alguns embeds.

Verificação sem dependências: `node check-roadbook.cjs`.

Cada etapa tem um gráfico SVG de altimetria nos detalhes, com distância em km e altitude em metros. Os perfis estão guardados em `detail.elevation.terrainProfile` como pares `[km, altitudeM]`, amostrados aproximadamente a cada 500 m sobre as polilinhas oficiais e obtidos do Copernicus DEM GLO-90 (90 m), via Open-Meteo. Funcionam offline, usam uma escala vertical comum e não representam o desnível acumulado. A primeira etapa começa em A Guarda; a travessia desde Caminha não está incluída. Os pontos de referência anteriores continuam disponíveis separadamente.

## Incorporar no Notion

1. Criar um bloco `/HTML` e seleccionar **HTML · Embeds**.
2. Abrir `index.html` como texto e copiar todo o conteúdo.
3. Colar o HTML no bloco e confirmar a incorporação.

O ficheiro tem cerca de 230 KB. Não precisa de alojamento, build, servidor nem uploads adicionais.

## Editar o plano

O bloco `roadbook-data` é a fonte única de verdade. Mantém o mesmo modelo JSON de viagem, etapas, alojamentos, decisões, orçamento e mapas; ao alterá-lo, é obrigatório preservar JSON válido.

Cada item em `plan.itinerary` pode incluir `detail.difficulty`, `detail.duration`, `detail.elevation`, `detail.mapPoints`, `detail.officialSegments`, `detail.routeNote`, `detail.warnings`, `detail.timeline`, `detail.waypoints`, `detail.food`, `detail.water`, `detail.pharmacies`, `detail.escapePoints`, `detail.luggage`, `detail.accommodationPrice` e `detail.accommodationLink`. As secções opcionais só aparecem quando têm dados.

As distâncias visíveis são derivadas de `distanceKmGps`, calculado sobre as polilinhas oficiais embebidas. Os `officialSegments` podem indicar `from`/`to` para recortar uma etapa e `pathIndexes` para excluir ramais alternativos. O orçamento é calculado no browser a partir de `support.budget.categories`.

O mapa geral só é criado quando se aproxima do ecrã e os mapas das etapas apenas quando cada detalhe é aberto. O renderer limpa instâncias e listeners anteriores, usa canvas para as polilinhas e apresenta uma recuperação explícita se o JSON embebido for inválido.

## Como continuar no Codex

> Continua o planeamento a partir de `index.html`. Respeita `AGENTS.md`. O próximo ponto é validar o transporte de bagagem. Sempre que fecharmos uma decisão, actualiza o bloco `roadbook-data` e a apresentação quando necessário.
