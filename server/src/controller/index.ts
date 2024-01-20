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
  NU_ANO_SAEB: number;
  CO_UF: number;
  SG_UF: string;
  NO_UF: string;
  CO_MUNICIPIO: string;
  NO_MUNICIPIO: string;
  ID_ESCOLA: string;
  NO_ESCOLA: string;
  TP_TIPO_REDE: number;
  TP_LOCALIZACAO: number;
  TP_CAPITAL: number;
  QTD_ALUNOS_INSE: number;
  MEDIA_INSE: number;
  INSE_CLASSIFICACAO: string;
  PC_NIVEL_1: number;
  PC_NIVEL_2: number;
  PC_NIVEL_3: number;
  PC_NIVEL_4: number;
  PC_NIVEL_5: number;
  PC_NIVEL_6: number;
  PC_NIVEL_7: number;
  PC_NIVEL_8: number;
}

const uploadExcel = async function (req: Request, res: Response) {
  res.render("uploadexcel", { text: "Upload Excel" });
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
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]) as InseDataItem[];

    for (const item of data) {
      await prismaClient.inseData.create({
        data: {
          nu_ano_saeb: item.NU_ANO_SAEB,
          co_uf: item.CO_UF,
          sg_uf: item.SG_UF,
          no_uf: item.NO_UF,
          co_municipio: String(item.CO_MUNICIPIO),
          no_municipio: item.NO_MUNICIPIO,
          id_escola: String(item.ID_ESCOLA),
          no_escola: item.NO_ESCOLA,
          tp_tipo_rede: item.TP_TIPO_REDE,
          tp_localizacao: item.TP_LOCALIZACAO,
          tp_capital: item.TP_CAPITAL,
          qtd_alunos_inse: item.QTD_ALUNOS_INSE,
          media_inse: item.MEDIA_INSE,
          inse_classificacao: item.INSE_CLASSIFICACAO,
          pc_nivel_1: item.PC_NIVEL_1,
          pc_nivel_2: item.PC_NIVEL_2,
          pc_nivel_3: item.PC_NIVEL_3,
          pc_nivel_4: item.PC_NIVEL_4,
          pc_nivel_5: item.PC_NIVEL_5,
          pc_nivel_6: item.PC_NIVEL_6,
          pc_nivel_7: item.PC_NIVEL_7,
          pc_nivel_8: item.PC_NIVEL_8
        }
      });
    }

    fs.unlinkSync(excel.tempFilePath);
    console.log("Data inserted successfully!");
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
      skip,
      take,
      orderBy: {
        no_escola: "asc"
      }
    }),
    prismaClient.inseData.count()
  ]);

  const totalOfPages = Math.ceil(total / take);

  return res.status(200).json({
    data: {
      total,
      totalOfPages,
      data
    }
  });
};

const findSchoolInseData = async function (req: Request, res: Response) {
  const { id } = req.params;

  const data = await prismaClient.inseData.findUniqueOrThrow({
    where: {
      id
    }
  });

  return res.status(200).json({ data });
};

export default {
  uploadExcel,
  excelData,
  listInseData,
  findSchoolInseData,
  upload,
  uploadOpts
};
