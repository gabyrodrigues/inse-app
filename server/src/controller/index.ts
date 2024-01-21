import { Request, Response } from "express";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import fileUpload from "express-fileupload";
import prismaClient from "../prisma";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: "/tmp/"
};

interface InseDataItem {
  nu_ano_saeb: number;
  co_uf: number;
  sg_uf: string;
  no_uf: string;
  co_municipio: string;
  no_municipio: string;
  id_escola: string;
  no_escola: string;
  tp_tipo_rede: number;
  tp_localizacao: number;
  tp_capital: number;
  qtd_alunos_inse: number;
  media_inse: number;
  inse_classificacao: string;
  pc_nivel_1: number;
  pc_nivel_2: number;
  pc_nivel_3: number;
  pc_nivel_4: number;
  pc_nivel_5: number;
  pc_nivel_6: number;
  pc_nivel_7: number;
  pc_nivel_8: number;
}

const transformExcelData = (excelData: any): InseDataItem => {
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
};

const excelData = async function (req: Request, res: Response) {
  try {
    const files = req.files as fileUpload.FileArray;
    const excel = files.excel as fileUpload.UploadedFile;

    if (excel.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      console.error("File is invalid.");
      fs.unlinkSync(excel.tempFilePath);
      return res.status(400).json({ error: "File is invalid." });
    }

    const workbook = xlsx.readFile(excel.tempFilePath);
    const sheetName = workbook.SheetNames[0];

    const rawData: Record<string, string>[] = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    ) as any[];
    const data = rawData.map(transformExcelData);

    for (const item of data) {
      await prismaClient.inseData.create({ data: item });
    }

    fs.unlinkSync(excel.tempFilePath);
    res.status(200).json({ message: "Data inserted successfully!" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Error inserting data into the database." });
  }
};

const listInseData = async function (req: Request, res: Response) {
  const page = req.query.page ? +req.query.page : 1;
  const pageSize = 100;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [data, total] = await prismaClient.$transaction([
    prismaClient.inseData.findMany({
      orderBy: {
        no_escola: "asc"
      },
      skip,
      take
    }),
    prismaClient.inseData.count()
  ]);

  const totalOfPages = Math.ceil(total / take);

  return res.status(200).json({
    total,
    totalOfPages,
    result: data
  });
};

const findSchoolInseData = async function (req: Request, res: Response) {
  const { id } = req.params;

  try {
    const data = await prismaClient.inseData.findUniqueOrThrow({
      where: {
        id
      }
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error finding data" });
  }
};

const searchData = async function (req: Request, res: Response) {
  const { search } = req.query;

  const page = req.query.page ? +req.query.page : 1;
  const pageSize = 100;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  try {
    const [data, total] = await prismaClient.$transaction([
      prismaClient.inseData.findMany({
        where: {
          OR: [
            { no_escola: { contains: String(search) } },
            { no_municipio: { contains: String(search) } },
            { no_uf: { contains: String(search) } }
          ]
        },
        skip,
        take
      }),
      prismaClient.inseData.count({
        where: {
          OR: [
            { no_escola: { contains: String(search) } },
            { no_municipio: { contains: String(search) } },
            { no_uf: { contains: String(search) } }
          ]
        }
      })
    ]);

    const totalOfPages = Math.ceil(total / take);

    return res.status(200).json({
      total,
      totalOfPages,
      result: data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error searching data" });
  }
};

interface FilterWhereParams {
  sg_uf?: string;
  qtd_alunos_inse?: number | { lte: number };
  media_inse?: number | { lte: number };
  inse_classificacao?: string;
  tp_tipo_rede?: { in: number[] };
  order?: string;
}

const filterData = async function (req: Request, res: Response) {
  const { sg_uf, qtd_alunos_inse, media_inse, inse_classificacao, tp_tipo_rede, order } = req.query;

  const page = req.query.page ? +req.query.page : 1;
  const pageSize = 100;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where: FilterWhereParams = {};

  if (sg_uf) {
    where.sg_uf = String(sg_uf);
  }

  if (qtd_alunos_inse) {
    where.qtd_alunos_inse = { lte: +qtd_alunos_inse };
  }

  if (media_inse) {
    where.media_inse = { lte: Number(media_inse) };
  }

  if (tp_tipo_rede) {
    where.tp_tipo_rede = {
      in: String(tp_tipo_rede)
        .split(",")
        .map((value: string) => +value.trim())
    };
  }

  if (inse_classificacao) {
    where.inse_classificacao = String(inse_classificacao);
  }

  try {
    const [data, total] = await prismaClient.$transaction([
      prismaClient.inseData.findMany({
        where,
        skip,
        take,
        orderBy: {
          no_escola: order === "asc" ? "asc" : "desc"
        }
      }),
      prismaClient.inseData.count({ where })
    ]);

    const totalOfPages = Math.ceil(total / take);

    return res.status(200).json({
      total,
      totalOfPages,
      result: data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error filtering data" });
  }
};

export default {
  excelData,
  listInseData,
  findSchoolInseData,
  searchData,
  filterData,
  upload,
  uploadOpts
};
