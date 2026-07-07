import { PDFLoader } from "@langchain/community";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/core/text_splitter";
const filePath = "./sample.pdf";
const loader = new PDFLoader(filePath);

const splitIntoChunks = async (text) => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    return splitter.splitText(text);
};

console.log(await loader.load());
