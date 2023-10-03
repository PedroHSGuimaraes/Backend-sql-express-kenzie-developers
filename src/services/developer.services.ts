import { QueryConfig } from "pg";
import { client } from "../database/database";
import { IDeveloper } from "../interfaces/devloper";

export const getDeveloperById = async (id: string) => {
  const queryString = `
       SELECT
        d.id AS "developerId",
        d.name AS "developerName",
        d.email AS "developerEmail",
        di.developerSince AS "developerInfoDeveloperSince",
        di.preferredOS AS "developerInfoPreferredOS"
      FROM
        developers d
      LEFT JOIN
        developerInfos di
      ON
        d.id = di.developerId
      WHERE
        d.id = $1;
     `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0];
};

export const createDeveloper = async (name: string, email: string) => {
  const queryString = `INSERT INTO developers (name, email) VALUES ($1, $2) RETURNING *`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name, email],
  };
  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0];
};

export const createDeveloperInfo = async (
  developerSince: Date,
  preferredOS: string,
  developerId: string
) => {
  const queryString = `
    INSERT INTO developerInfos (developerSince, preferredOS, developerID)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerSince, preferredOS, developerId],
  };

  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0];
};

export const updateDeveloper = async (
  id: string,
  name: string,
  email: string
) => {
  const queryString = `
    UPDATE developers
    SET name = $1, email = $2
    WHERE id = $3
    RETURNING *
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id, name, email],
  };

  const data = await client.query<IDeveloper>(queryConfig);
  return data.rows[0];
};

export const deleteDeveloper = async (id: string): Promise<void> => {
  const queryString = `
    DELETE FROM developers
    WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query<IDeveloper>(queryConfig);
};
