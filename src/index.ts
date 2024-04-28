import {
  createFiles,
  getGeskoPrices,
  nowPrefix,
  onlyUnique,
  readFileLines,
  sleep,
  splitIntoAvgChunks,
  writeFile,
} from "@alfar/helpers";
import cliProgress from "cli-progress";
import tokens, { TokenId } from "./tokens";
import checker from "./checker";
import { createCsvString } from "./helpers";
import { OtherField } from "./types";

const fields: Array<TokenId | OtherField> = [
  "balance_usd",
  "apt",
  "lz_usdc",
  "lz_usdt",
  "lz_weth",
  "ditto_apt",
  "tapt",
  "txs_count",
];

const FILE_INPUT = "input/addresses.txt";
const FILE_OUTPUT = `output/${nowPrefix()}.csv`;

const main = async () => {
  createFiles([FILE_INPUT, FILE_OUTPUT]);

  const addresses = readFileLines(FILE_INPUT);

  const geskoIds = tokens.map((t) => t.geskoId).filter(onlyUnique);

  const tokenPrices = await getGeskoPrices(geskoIds);

  const getPrice = (id: string) => tokenPrices[id as keyof typeof tokenPrices];

  const chunks = splitIntoAvgChunks(addresses, 30);

  const bar = new cliProgress.SingleBar(
    {
      clearOnComplete: false,
      hideCursor: false,
      format: " {bar} | {eta_formatted} | {value}/{total}",
    },
    cliProgress.Presets.shades_grey
  );

  bar.start(addresses.length, 0);

  const data = [];

  for (const chunk of chunks) {
    const chunkResult = await Promise.all(
      chunk.map((a) => checker(a, getPrice))
    );

    data.push(...chunkResult);

    bar.increment(chunk.length);

    await sleep(3);
  }

  bar.stop();

  const str = data
    .map((account) => createCsvString(account, fields))
    .join("\n");

  writeFile(FILE_OUTPUT, str);
};

main();
