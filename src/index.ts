import * as Cryptojs from "crypto-js";
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timeStamp: number,
    data: string
  ): string =>
    Cryptojs.SHA256(index + previousHash + timeStamp, data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timeStamp === "number" &&
    typeof aBlock.data === "string";

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}
const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getLastestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLastestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timeStamp,
    aBlock.data
  );

const isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockVaild(candidateBlock, getLastestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("one"), createNewBlock("two");
createNewBlock("three");
console.log(blockchain);
export {};
