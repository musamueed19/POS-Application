import { useReactToPrint } from "react-to-print";
import { useRef, forwardRef, useState, useEffect } from "react";

const Test = () => {
    const [isPrinting, setIsPrinting] = useState(false);
    const contentRef = useRef(null);

    // We store the resolve Promise being used in `onBeforePrint` here
    const promiseResolveRef = useRef(null);

    // We watch for the state to change here, and for the Promise resolve to be available
    useEffect(() => {
      if (isPrinting && promiseResolveRef.current) {
        // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
        promiseResolveRef.current();
      }
    }, [isPrinting]);

    const handlePrint = useReactToPrint({
      contentRef,
      onBeforePrint: () => {
        return new Promise((resolve) => {
          promiseResolveRef.current = resolve;
          setIsPrinting(true);
        });
      },
      onAfterPrint: () => {
        // Reset the Promise resolve so we can print again
        promiseResolveRef.current = null;
        setIsPrinting(false);
      },
    });

  return (
    <div>
      <button onClick={handlePrint} disabled={isPrinting}>
        {isPrinting ? "Loading..." : "Print"}
      </button>
      <div ref={contentRef} style={{ padding: "20px" }}>
        <h1>Your Receipt</h1>
        <p>Order #12345</p>
        <table>
          <tr>
            <td>Item</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>$1.00</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px" }}>
      <h1>Your Receipt</h1>
      <p>Order #12345</p>
      <table>
        <tr>
          <td>Item</td>
          <td>$10.00</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td>$1.00</td>
        </tr>
      </table>
    </div>
  );
});

export default Test;
