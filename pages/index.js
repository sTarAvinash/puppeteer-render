import scrape from "./scrape";
import React from "react";
import styles from "../styles/scraper.module.css";

const MyComponent = () => {
  const handleScrape = async () => {
    try {
      await scrape();
      //toast.success("Scraping completed successfully."); // Show success toast
    } catch (error) {
      console.error("An error occurred while scraping:", error);
      toast.error("An error occurred while scraping."); // Show error toast
    }
  };

  return (
    <div>
      <div className={styles.centerPage}>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleScrape}>
            Scrape Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;

/*import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportTIS from "@/components/scrapper";
import React from "react";
const Importgst = () => {
  return (
    <div>
    <ImportTIS/>
    <ToastContainer/>
    </div>
  );
};


export default Importgst;
*/
