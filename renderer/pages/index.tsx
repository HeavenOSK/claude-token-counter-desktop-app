import { useEffect } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args);
    window.electron.receiveHello(handleMessage);
    return () => {
      window.electron.stopReceivingHello(handleMessage);
    };
  }, []);

  return (
    <Layout title="Claude Token Counter">
      <h1>Claude Token Counter</h1>
      <div>
        <textarea 
          placeholder="テキストを入力してください..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '12px',
            marginTop: '20px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
    </Layout>
  );
};

export default IndexPage;
