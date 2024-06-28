const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");

const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'demo',
});

const sdk = new NodeSDK({
  resource: resource,
  traceExporter: new ZipkinExporter({
    serviceName: "demo",
    url: "http://localhost:9411/api/v2/spans"
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
