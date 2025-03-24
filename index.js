import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.post("/registrar", (req, res) => {
  const { nome, curso, email, tel } = req.body; // Pega os dados do formulário

  // Cria uma string formatada com os dados do aluno
  const dadosAluno = `Nome: ${nome}\nCurso: ${curso}\nEmail: ${email}\nTelefone: ${tel}\n\n`;

  // Salva os dados no arquivo
  fs.appendFile("dados.txt", dadosAluno, (err) => {
    if (err) {
      return res.status(500).send("Erro ao salvar dados");
    }

    // Redireciona para a página de resultado e passa o nome
    res.render("resultado", { nome });
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})