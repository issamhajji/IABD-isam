const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, SASProtocol } = require('@azure/storage-blob');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = 'scans-img';
const blobName = 'scans';

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

const containerClient = blobServiceClient.getContainerClient(containerName);

const generateUrl = async (req, res) => {
    const blobName = `${Date.now()}-scan.jpg`;
    const blobClient = containerClient.getBlobClient(blobName);

    const sasOptions = {
        containerName: containerName,
        blobName: blobName,
        permissions: 'racw',
        expiresOn: new Date(Date.now() + 3600000),
        protocol: SASProtocol.Https
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

    const uploadUrl = `${blobClient.url}?${sasToken}`;
    const imageUrl = `${blobClient.url}`;

    res.json({ uploadUrl, imageUrl });
}

module.exports = {
    generateUrl
};