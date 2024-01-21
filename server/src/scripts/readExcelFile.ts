import xlsx from "xlsx";
import fs from "fs";
import mimeTypes from "mime-types";

import { InseDataItem } from "../controller";
import prismaClient from "../prisma";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Forneça o caminho para o arquivo do Excel como um argumento de linha de comando.");
  process.exit(1);
}

function transformExcelData(excelData: any): InseDataItem {
  const transformedData: InseDataItem = {
    nu_ano_saeb: excelData?.NU_ANO_SAEB,
    co_uf: excelData?.CO_UF,
    sg_uf: excelData?.SG_UF,
    no_uf: excelData?.NO_UF,
    co_municipio: String(excelData?.CO_MUNICIPIO),
    no_municipio: excelData?.NO_MUNICIPIO,
    id_escola: String(excelData?.ID_ESCOLA),
    no_escola: excelData?.NO_ESCOLA,
    tp_tipo_rede: excelData?.TP_TIPO_REDE,
    tp_localizacao: excelData?.TP_LOCALIZACAO,
    tp_capital: excelData?.TP_CAPITAL,
    qtd_alunos_inse: excelData?.QTD_ALUNOS_INSE,
    media_inse: excelData?.MEDIA_INSE,
    inse_classificacao: excelData?.INSE_CLASSIFICACAO,
    pc_nivel_1: excelData?.PC_NIVEL_1,
    pc_nivel_2: excelData?.PC_NIVEL_2,
    pc_nivel_3: excelData?.PC_NIVEL_3,
    pc_nivel_4: excelData?.PC_NIVEL_4,
    pc_nivel_5: excelData?.PC_NIVEL_5,
    pc_nivel_6: excelData?.PC_NIVEL_6,
    pc_nivel_7: excelData?.PC_NIVEL_7,
    pc_nivel_8: excelData?.PC_NIVEL_8
  };

  return transformedData;
}

async function processExcelData(filePath: string) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mimeTypes.lookup(filePath);

    if (mimeType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      console.error("O arquivo inserido é invalido.");
      throw new Error("O arquivo inserido é invalido.");
    }

    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    console.log("Salvando dados, aguarde um momento.");

    const rawData: Record<string, string>[] = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    ) as any[];
    const data = rawData.map(transformExcelData);

    for (const item of data) {
      await prismaClient.inseData.create({ data: item });
    }

    console.log("Dados inseridos com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir dados:", err);
    throw new Error("Erro ao inserir dados.");
  }
}

processExcelData(filePath);
