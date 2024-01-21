import { StyledButton } from "@components/Button";
import { ItemContext } from "@contexts/Item";
import { Flex, Select, Slider, Stack, Text } from "@mantine/core";
import { UFs } from "@utils/data";
import { useContext, useState } from "react";

interface QueryParams {
  order?: string;
  uf?: string;
  classInse?: string;
  mediaInse?: number;
}

export function Filter() {
  const [order, setOrder] = useState("asc");
  const [uf, setUf] = useState("");
  const [classInse, setClassInse] = useState("");
  const [mediaInse, setMediaInse] = useState(10);

  const { handleFilterData, searchTerm } = useContext(ItemContext);

  async function handleFilterParams() {
    const queryParams = formatQueryParams({ order, uf, classInse, mediaInse });
    await handleFilterData(queryParams);
  }

  function formatQueryParams(params: QueryParams) {
    const searchParams = new URLSearchParams();

    if (params.order) {
      searchParams.set("order", params.order);
    }

    if (params.uf) {
      searchParams.set("sg_uf", params.uf);
    }

    if (params.classInse) {
      searchParams.set("inse_classificacao", params.classInse);
    }

    if (params.mediaInse) {
      searchParams.set("media_inse", String(params.mediaInse));
    }

    if (searchTerm) {
      searchParams.set("search", searchTerm);
    }

    return `?${searchParams.toString()}`;
  }

  return (
    <Flex className="gap-4 items-center">
      <Select
        className="text-left"
        label="Ordenar por escola:"
        checkIconPosition="left"
        data={[
          { value: "asc", label: "Crescente" },
          { value: "desc", label: "Decrescente" }
        ]}
        value={order}
        onChange={(value) => setOrder(String(value))}
      />

      <Select
        className="text-left"
        label="UF:"
        placeholder="Selecione uma UF"
        checkIconPosition="left"
        data={UFs}
        value={uf}
        onChange={(value) => setUf(String(value))}
      />

      <Select
        className="text-left"
        label="Classificação no Inse:"
        placeholder="Selecione uma Classificação"
        checkIconPosition="left"
        data={[
          { value: "Nível I", label: "Nível I" },
          { value: "Nível II", label: "Nível II" },
          { value: "Nível III", label: "Nível III" },
          { value: "Nível IV", label: "Nível IV" },
          { value: "Nível V", label: "Nível V" },
          { value: "Nível VI", label: "Nível VI" }
        ]}
        value={classInse}
        onChange={(value) => setClassInse(String(value))}
      />

      <Stack className="gap-2 justify-start text-left min-w-[200px]">
        <Text className="text-sm font-medium leading-7">Média do Inse:</Text>
        <Slider
          min={0}
          max={10}
          label={(value) => value.toFixed(1)}
          step={0.1}
          styles={{ markLabel: { display: "none" } }}
          value={mediaInse}
          onChange={(value) => setMediaInse(value)}
        />
      </Stack>

      <StyledButton
        variant="filled"
        className="p-3 ml-auto"
        onClick={handleFilterParams}>
        Aplicar filtros
      </StyledButton>
    </Flex>
  );
}
