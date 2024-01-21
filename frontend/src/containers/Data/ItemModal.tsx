import { Group, Stack, Text, Modal } from "@mantine/core";
import { InseDataItem } from "@utils/data";

interface ItemModalProps {
  data: InseDataItem;
  opened: boolean;
  onClose: () => void;
}

export function ItemModal({ opened, onClose, data }: ItemModalProps) {
  return (
    <Modal
      opened={opened}
      size="xl"
      centered
      title={<Text className="font-bold text-2xl">Detalhes</Text>}
      onClose={onClose}>
      <Stack
        p="xs"
        gap={6}>
        <Group gap={6}>
          <Text className="font-bold">Ano de aplicação do Saeb:</Text>
          <Text>{data.nu_ano_saeb}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Código da Unidade da Federação:</Text>
          <Text>{data.co_uf}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Sigla da Unidade da Federação:</Text>
          <Text>{data.sg_uf}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Nome da Unidade da Federação:</Text>
          <Text>{data.no_uf}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Código do Município:</Text>
          <Text>{data.co_municipio}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Nome do Município:</Text>
          <Text>{data.no_municipio}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Código da Escola no CENSO Escolar:</Text>
          <Text>{data.id_escola}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Nome da Escola no CENSO Escolar:</Text>
          <Text>{data.no_escola}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Dependência Administrativa da Escola:</Text>
          <Text>{data.tp_tipo_rede}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Localização da Escola:</Text>
          <Text>{data.tp_localizacao}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Área da Escola (relacionado ao Município):</Text>
          <Text>{data.tp_capital}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Quantidade de Alunos com INSE calculado utilizado para o cálculo das médias por escola:
          </Text>
          <Text>{data.qtd_alunos_inse}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Média do Indicador de Nível Socioeconômico dos alunos da escola:
          </Text>
          <Text>{data.media_inse}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">Classificação do Indicador de Nível Socioeconômico:</Text>
          <Text>{data.inse_classificacao}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível I:
          </Text>
          <Text>{data.pc_nivel_1}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível II:
          </Text>
          <Text>{data.pc_nivel_2}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível III:
          </Text>
          <Text>{data.pc_nivel_3}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível IV:
          </Text>
          <Text>{data.pc_nivel_4}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível V:
          </Text>
          <Text>{data.pc_nivel_5}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível VI:
          </Text>
          <Text>{data.pc_nivel_6}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível VII:
          </Text>
          <Text>{data.pc_nivel_7}</Text>
        </Group>
        <Group gap={6}>
          <Text className="font-bold">
            Percentual de alunos da Escola classificados no Nível VIII:
          </Text>
          <Text>{data.pc_nivel_8}</Text>
        </Group>
      </Stack>
    </Modal>
  );
}
