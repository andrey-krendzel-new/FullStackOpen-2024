```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser-->>server: Req.body (in the fetch request). content: String, date: Date.
    activate server

    Note right of browser: Page doesn't get refreshed, unlike the case with https://studies.cs.helsinki.fi/exampleapp/notes

```
