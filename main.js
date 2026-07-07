import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'

const embeddings = new MistralAIEmbeddings({
    model: "mistral-embed",
    apiKey: process.env.MISTRAL_API_KEY,
});
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// const filePath = "./sample.pdf";
// const loader = new PDFLoader(filePath);

// const splitIntoChunks = async (text) => {
//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 100,
//         chunkOverlap: 50,
//     });
//     return splitter.splitText(text);
// };

// const docs = await loader.load();

// // Flatten all per-page chunk arrays into one list
// const chunksNested = await Promise.all(
//     docs.map(async (doc) => await splitIntoChunks(doc.pageContent))
// );
// const flatChunks = chunksNested.flat();

// // Embed all chunks in one batch call
// const flatEmbeddings = await embeddings.embedDocuments(flatChunks);

// const pineconeIndex = pinecone.Index("use-rag"); //my pinecone index

// // Build one Pinecone record per chunk with its corresponding embedding vector
// const vectorData = flatChunks.map((chunk, i) => ({
//     id: `vec${i}`,
//     values: flatEmbeddings[i],
//     metadata: { chunk },
// }));

// await pineconeIndex.upsert({ records: vectorData });

// console.log("Uploaded", vectorData.length, "vectors");

const embedQuery = await embeddings.embedQuery("what was dragon ding in story ?");

const result = await pinecone.Index("use-rag").query({
    topK: 3,
    vector: embedQuery,
    includeMetadata: true
})

console.log(result.matches);
