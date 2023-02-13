import Head from 'next/head'
import Button from '@mui/material/Button';
import { ChangeEvent, useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";

type performanceLog = {
  day: number;
  timestamp: number;
  product: string;
  bid_price_1: number;
  bid_volume_1: number;
  bid_price_2?: number | null;
  bid_volume_2?: number | null;
  bid_price_3?: number | null;
  bid_volume_3?: number | null;
  ask_price_1: number;
  ask_volume_1: number;
  ask_price_2?: number | null;
  ask_volume_2?: number | null;
  ask_price_3?: number | null;
  ask_volume_3?: number | null;
  mid_price: number;
  profit_and_loss: number;
};

export default function Home() {
  const [csvData, setCsvData] = useState<performanceLog[]>([]);
  const [filename, setFilename] = useState("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      const records = parse(result as string, {
        columns: ["day", "timestamp", "product", "bid_price_1", "bid_volume_1", "bid_price_2", "bid_volume_2", "bid_price_3", "bid_volume_3", "ask_price_1", "ask_volume_1", "ask_price_2", "ask_volume_2", "ask_price_3", "ask_volume_3", "mid_price", "profit_and_loss"],
        delimiter: ";",
        from_line: 2,
        trim: true,
        skip_empty_lines: true
      });
      setCsvData(records);
      generateData(records);
    };
    reader.readAsBinaryString(file);
  };

  const generateData = (props: performanceLog[]) => {
    let products: any = {};
    for (let i = 0; i < props.length; i++) {
      const element = props[i];
      if (products.hasOwnProperty(element["product"])) {
        products[element["product"]]["data"].push(element["ask_price_1"]);
      } else {
        products[element["product"]] = {
          label: element["product"],
          data: [element["ask_price_1"]]
        };
      }
    }
    console.log(JSON.stringify(products));
  };

  return (
    <>
      <Head>
        <title>IMC Prosperity Dashboard</title>
        <meta name="description" content="IMC Prosperity Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>IMC Prosperity Dashboard</h1>
          <p>{filename}</p>
          <p>{JSON.stringify(csvData)}</p>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="text/csv" type="file" onChange={handleFileUpload} />
          </Button>
        </div>
      </main>
    </>
  )
}
