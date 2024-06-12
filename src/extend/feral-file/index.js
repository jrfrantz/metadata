const collectionsTokenIdRange = [
  [
    "Winslow Homer's Croquet Challenge by Mitchell F. Chan",
    "25811853076941608055270457512038717433705462539422789705262203111341130500760",
    "25811853076941608055270457512038717433705462539422789705262203111341130501225",
  ],
  [ 
    "The Bell Machine by Anne Spalter",
    "102483456495595525347856182687662158730242810709523643804999349043957638016883",
    "102483456495595525347856182687662158730242810709523643804999349043957638016886",
  ],
];

const getCollectionTokenIdRange = (contract, tokenId) => {
  return collectionsTokenIdRange.find(
    (collectionInfo) =>
      collectionInfo[1] <= tokenId.toString() && tokenId.toString() <= collectionInfo[2]
  );
};

export const extendCollection = async (chainId, metadata, tokenId) => {
  if (isNaN(Number(tokenId))) {
    throw new Error(`Invalid tokenId ${tokenId}`);
  }

  const collection = getCollectionTokenIdRange(metadata.contract, tokenId);

  if (collection) {
    const [collectionName, startTokenId, endTokenId] = collection;
    metadata.name = collectionName;
    metadata.id = `${metadata.contract.toLowerCase()}:${startTokenId}:${endTokenId}`;
    metadata.tokenIdRange = [startTokenId, endTokenId];
    metadata.tokenSetId = `range:${metadata.contract.toLowerCase()}:${startTokenId}:${endTokenId}`;
    metadata.isFallback = undefined;
  }

  return metadata;
};

export const extend = async (_chainId, metadata) => {
  const collection = getCollectionTokenIdRange(metadata.contract, metadata.tokenId);

  if (collection) {
    const [collectionName, startTokenId, endTokenId] = collection;
    metadata.name = collectionName;
    metadata.collection = `${metadata.contract.toLowerCase()}:${startTokenId}:${endTokenId}`;
  }

  return metadata;
};
