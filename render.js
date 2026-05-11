#!/usr/bin/env node
/**
 * Helper que construye el comando `npx hyperframes render` desde config.json
 * y los datos del peleador en recursos/personas/<slug>/metadata.json.
 *
 * Uso: node render.js [--dry-run]
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDryRun = process.argv.includes("--dry-run");

// Cargar config del proyecto
const config = JSON.parse(readFileSync(join(__dirname, "config.json"), "utf8"));

// Cargar metadata del peleador
const personaSlug = config.persona;
const personaPath = join(__dirname, "../../recursos/personas", personaSlug, "metadata.json");

if (!existsSync(personaPath)) {
  console.error(`Error: no se encontró metadata para "${personaSlug}" en:\n  ${personaPath}`);
  process.exit(1);
}

const persona = JSON.parse(readFileSync(personaPath, "utf8"));

// Cargar paleta si está definida
let paleta = {};
if (config.paleta) {
  const paletaPath = join(__dirname, "../../recursos/paletas", config.paleta);
  if (existsSync(paletaPath)) {
    paleta = JSON.parse(readFileSync(paletaPath, "utf8"));
  }
}

// Construir objeto de variables para hyperframes
const variables = {
  titulo_evento: config.titulo_evento,
  persona_nombre: persona.nombre,
  persona_apodo: persona.apodo,
  persona_record: persona.stats?.record ?? "",
  persona_division: persona.stats?.peso ?? "",
  persona_peso: persona.stats?.peso ?? "",
  persona_nacionalidad: persona.nacionalidad ?? "",
  persona_foto: join(__dirname, "../../recursos/personas", personaSlug, persona.fotos?.main ?? ""),
  color_primario: paleta.primario ?? persona.colores?.primario ?? "#C41E3A",
  color_secundario: paleta.secundario ?? persona.colores?.secundario ?? "#FFD700",
  color_fondo: paleta.fondo ?? "#0a0a0a",
  ...config.overrides,
};

// Construir el comando
const { fps, calidad, formato } = config.exportar;
const slug = personaSlug + "-" + Date.now();
const outputFile = join(__dirname, "output", `${slug}.${formato}`);

const cmd = [
  "npx hyperframes render",
  `--fps ${fps}`,
  `--quality ${calidad}`,
  `--format ${formato}`,
  `--output "${outputFile}"`,
  `--variables '${JSON.stringify(variables)}'`,
].join(" ");

console.log("Variables:", JSON.stringify(variables, null, 2));
console.log("\nComando:");
console.log(cmd);

if (!isDryRun) {
  console.log("\nRenderizando...");
  execSync(cmd, { stdio: "inherit", cwd: __dirname });
  console.log(`\nVideo exportado: ${outputFile}`);
} else {
  console.log("\n[dry-run] Comando no ejecutado.");
}
