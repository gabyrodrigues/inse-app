import { Request, Response } from "express";

import prismaClient from "../prisma";

export interface InseDataItem {
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
    return res.status(500).json({ error: "Erro ao buscar dados." });
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
            { no_escola: { contains: String(search), mode: "insensitive" } },
            { no_municipio: { contains: String(search), mode: "insensitive" } },
            { no_uf: { contains: String(search), mode: "insensitive" } }
          ]
        },
        skip,
        take
      }),
      prismaClient.inseData.count({
        where: {
          OR: [
            { no_escola: { contains: String(search), mode: "insensitive" } },
            { no_municipio: { contains: String(search), mode: "insensitive" } },
            { no_uf: { contains: String(search), mode: "insensitive" } }
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
    return res.status(500).json({ error: "Erro ao realizar busca." });
  }
};

interface FilterWhereParams {
  sg_uf?: string;
  qtd_alunos_inse?: number | { lte: number };
  media_inse?: number | { lte: number };
  inse_classificacao?: string;
  tp_tipo_rede?: { in: number[] };
  order?: string;
  OR?: Array<
    | { no_municipio?: { contains: string; mode: "insensitive" } }
    | { no_escola?: { contains: string; mode: "insensitive" } }
    | { no_uf?: { contains: string; mode: "insensitive" } }
  >;
}

const filterData = async function (req: Request, res: Response) {
  const { sg_uf, qtd_alunos_inse, search, media_inse, inse_classificacao, tp_tipo_rede, order } =
    req.query;

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

  if (search) {
    where.OR = [
      { no_escola: { contains: String(search), mode: "insensitive" } },
      { no_municipio: { contains: String(search), mode: "insensitive" } },
      { no_uf: { contains: String(search), mode: "insensitive" } }
    ];
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
    return res.status(500).json({ error: "Erro ao filtrar dados." });
  }
};

export default {
  listInseData,
  findSchoolInseData,
  searchData,
  filterData
};
