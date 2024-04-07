import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", (req: Request, res: Response) => {
  mockEmailSending(req.body.email).subscribe(
    () => {
      const str = Math.random().toString(36).substr(2, 9);
      res.status(200).json(str);
    },
    (error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  );
});

function mockEmailSending(emailData: string): Observable<any> {
  return of(emailData).pipe(
    delay(2000) // Simulate delay of 2 seconds
  );
}

// Validate Date of Birth Endpoint
app.post("/validate-dob", (req: Request, res: Response) => {
  const { dob } = req.body;

  const today = new Date();
  const birthDate = new Date(dob);
  const age = birthDate.getFullYear() - today.getFullYear();
  const isOver18 = age > 18;

  res.status(200).send(isOver18 ? true : false);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
