# Santiago Planner

Base local para continuar o planeamento do Caminho de Santiago no Codex.

## Abrir o roadbook

No terminal, dentro desta pasta:

```bash
./serve.sh
```

Depois abrir:

```text
http://localhost:8080
```

## Fonte única de verdade

- `roadbook.json` - plano, etapas, alojamentos, regras, decisões, orçamento, mapas e todos os dados visíveis; editar este ficheiro e recarregar a página actualiza a apresentação
- `AGENTS.md` - regras para o Codex
- `index.html` - roadbook visual numa única página

O mapa do roadbook usa Leaflet com tiles públicos do OpenStreetMap e mantém a atribuição visível no mapa. As coordenadas do traçado oficial estão embutidas em `roadbook.json`, sob `map.officialRoute.paths`; a fonte original está identificada no rodapé do mapa. A geometria está simplificada com Ramer–Douglas–Peucker (tolerância de 2 m), e a redução fica documentada em `map.officialRoute.simplification`.

O `index.html` não contém os dados da viagem: carrega `roadbook.json` com `cache: no-store` e renderiza o cabeçalho, itinerário, estados, detalhes expansíveis de cada etapa, mapas, orçamento calculado e rodapé a partir desse ficheiro. O bloco `plan` reúne o conteúdo que anteriormente estava disperso por `PLAN.md`, `itinerary.json` e `accommodation.json`. Depois de editar o JSON, basta recarregar `http://localhost:8080`.

Cada item em `plan.itinerary` pode incluir `detail.difficulty`, `detail.mapPoints`, `detail.officialSegments`, `detail.routeNote`, `detail.accommodationPrice` e `detail.accommodationLink`. As distâncias visíveis são derivadas de `distanceKmGps`, calculado sobre as polilinhas embutidas, e `distanceSource` explica a base da medição; `distanceKmEstimate` mantém a aproximação original para comparação. Os `officialSegments` referenciam as secções oficiais já embutidas no JSON, podem indicar `from`/`to` para recortar uma etapa e `pathIndexes` para excluir ramais alternativos da distância principal. O orçamento usa `support.budget.categories` com `min`, `max` e `multiplier`; o total é calculado no browser, por isso não é necessário editar os totais manualmente.

## Como continuar no Codex

Exemplo:

> Continua o planeamento a partir dos ficheiros deste projeto. Respeita AGENTS.md. O próximo ponto é validar o transporte de bagagem. Sempre que fecharmos uma decisão, actualiza o roadbook.
