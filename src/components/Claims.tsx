import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

function Claims() {
  const { getUserClaims } = useAuth();
  const [claims, setClaims] = useState<Record<string, any> | null>(null);

  return (
    <div>
      <pre>{JSON.stringify(claims, null, 2)}</pre>
      <Button
        onClick={async () => {
          setClaims(await getUserClaims());
        }}
      >
        Claim
      </Button>
    </div>
  );
}

export default Claims;
