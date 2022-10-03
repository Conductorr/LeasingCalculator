import { useCallback, useState } from "react";
import axios, { AxiosRequestHeaders } from "axios";
import { TValues } from "types";

export type TSubmitParameters = {
  values: TValues;
  monthlyPay: number;
  leaseAgreementAmount: number;
};

export type TSubmitHookResult = {
  loading: boolean;
  handleSubmit: () => void;
};

export function useSubmit({
  values,
  monthlyPay,
  leaseAgreementAmount,
}: TSubmitParameters): TSubmitHookResult {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      await axios.post(
        "https://eoj3r7f3r4ef6v4.m.pipedream.net",
        JSON.stringify({ ...values, monthlyPay, leaseAgreementAmount }),
        {
          headers: <AxiosRequestHeaders>{
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, handleSubmit };
}
