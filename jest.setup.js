import "@testing-library/jest-dom/extend-expect";

// Fixes ReferenceError: TextEncoder is not defined
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });
