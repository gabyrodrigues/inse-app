-- CreateTable
CREATE TABLE "inse_data" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nu_ano_saeb" INTEGER NOT NULL,
    "co_uf" INTEGER NOT NULL,
    "sg_uf" TEXT NOT NULL,
    "no_uf" TEXT NOT NULL,
    "co_municipio" TEXT NOT NULL,
    "no_municipio" TEXT NOT NULL,
    "id_escola" TEXT NOT NULL,
    "no_escola" TEXT NOT NULL,
    "tp_tipo_rede" INTEGER NOT NULL,
    "tp_localizacao" INTEGER NOT NULL,
    "tp_capital" INTEGER NOT NULL,
    "qtd_alunos_inse" INTEGER NOT NULL,
    "media_inse" DOUBLE PRECISION NOT NULL,
    "inse_classificacao" TEXT NOT NULL,
    "pc_nivel_1" DOUBLE PRECISION NOT NULL,
    "pc_nivel_2" DOUBLE PRECISION NOT NULL,
    "pc_nivel_3" DOUBLE PRECISION NOT NULL,
    "pc_nivel_4" DOUBLE PRECISION NOT NULL,
    "pc_nivel_5" DOUBLE PRECISION NOT NULL,
    "pc_nivel_6" DOUBLE PRECISION NOT NULL,
    "pc_nivel_7" DOUBLE PRECISION NOT NULL,
    "pc_nivel_8" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "inse_data_pkey" PRIMARY KEY ("id")
);