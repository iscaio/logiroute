/*
  Warnings:

  - You are about to drop the column `statusColeta` on the `Encomenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Encomenda" DROP COLUMN "statusColeta",
ADD COLUMN     "motoristaId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'AGUARDANDO_COLETA';

-- AddForeignKey
ALTER TABLE "Encomenda" ADD CONSTRAINT "Encomenda_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
