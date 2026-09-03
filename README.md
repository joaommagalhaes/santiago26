# Santiago Planner

Roadbook autónomo do Caminho de Santiago, preparado para o bloco **HTML · Embeds** do Notion.

## Ficheiro publicável

Toda a aplicação vive em `index.html`:

- estilos dentro de `<style>`;
- plano completo dentro de `<script type="application/json" id="roadbook-data">`;
- renderer e interacções dentro do último `<script>`.

Não existem dependências locais. O ficheiro pode ser aberto directamente num browser ou inserido no bloco HTML do Notion. É necessária ligação à internet para carregar as fontes, os ícones, o Leaflet e os tiles do OpenStreetMap.

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
