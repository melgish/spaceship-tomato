-- DropForeignKey
ALTER TABLE `Reading` DROP FOREIGN KEY `Reading_bucketId_fkey`;

-- AddForeignKey
ALTER TABLE `Reading` ADD CONSTRAINT `Reading_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `Bucket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
