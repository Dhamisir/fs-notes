import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export async function getNotionData() {
    try {
        const response = await notion.dataSources.query({
            data_source_id: process.env.NOTION_DATA_SOURCE_ID,
        });

        const rows = response.results.map((page) => {
            const row = {};
            for (const [header, property] of Object.entries(page.properties ?? {})) {
                row[header] = readPropertyValue(property);
            }
            return row;
        });

        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}


function readPropertyValue(property) {
    switch (property.type) {
        case "title":
            return property.title.map((item) => item.plain_text).join("");
        case "rich_text":
            return property.rich_text.map((item) => item.plain_text).join("");
        case "number":
            return property.number;
        case "select":
            return property.select?.name ?? null;
        case "multi_select":
            return property.multi_select.map((item) => item.name);
        case "checkbox":
            return property.checkbox;
        case "date":
            return property.date?.start ?? null;
        case "url":
            return property.url;
        case "email":
            return property.email;
        case "phone_number":
            return property.phone_number;
        case "status":
            return property.status?.name ?? null;
        default:
            return null;
    }
}
