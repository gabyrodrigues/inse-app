import { Text, MantineTheme } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { InseDataItem } from "@utils/data";

interface RowsProps {
  theme: MantineTheme;
}

export function DrawColumns(props: RowsProps): DataTableColumn<InseDataItem>[] {
  const { theme } = props;

  return [
    {
      accessor: "nu_ano_saeb",
      title: "Ano Saeb",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ nu_ano_saeb }) => {
        return <Text>{nu_ano_saeb}</Text>;
      }
    },
    {
      accessor: "no_uf",
      title: "Nome da UF",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ no_uf }) => {
        return <Text>{no_uf}</Text>;
      }
    },
    {
      accessor: "sg_uf",
      title: "UF",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ sg_uf }) => {
        return <Text>{sg_uf}</Text>;
      }
    },
    {
      accessor: "no_municipio",
      title: "Município",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ no_municipio }) => {
        return <Text>{no_municipio}</Text>;
      }
    },
    {
      accessor: "no_escola",
      title: "Nome da Escola",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      width: "30%",
      render: ({ no_escola }) => {
        return <Text>{no_escola}</Text>;
      }
    },
    {
      accessor: "qtd_alunos_inse",
      title: "Qtd. Alunos Inse",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ qtd_alunos_inse }) => {
        return <Text>{qtd_alunos_inse}</Text>;
      }
    },
    {
      accessor: "media_inse",
      title: "Média Inse",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ media_inse }) => {
        const media = Number.isInteger(media_inse)
          ? media_inse
          : media_inse.toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 2
            });

        return <Text>{media}</Text>;
      }
    },
    {
      accessor: "inse_classificacao",
      title: "Classificação do Inse",
      titleStyle: {
        color: theme.colors.gray[9],
        fontWeight: 500
      },
      textAlign: "left",
      render: ({ inse_classificacao }) => {
        return <Text>{inse_classificacao}</Text>;
      }
    }
  ];
}
