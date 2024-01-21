export interface InseDataItem {
  id: string;
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

export const UFs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
];
