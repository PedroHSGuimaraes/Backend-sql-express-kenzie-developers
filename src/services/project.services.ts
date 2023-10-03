import { QueryConfig } from "pg";
import { client } from "../database/database";
import { IProject } from "../interfaces/project";

export const getProjectById = async (id: string) => {
  const queryString = `
    SELECT
      p.id AS "projectId",
      p.name AS "projectName",
      p.description AS "projectDescription",
      p.repository AS "projectRepository",
      p.startDate AS "projectStartDate",
      p.endDate AS "projectEndDate",
      d.id AS "developerId",
      d.name AS "developerName",
      d.email AS "developerEmail",
      di.developerSince AS "developerInfoDeveloperSince",
      di.preferredOS AS "developerInfoPreferredOS"
    FROM
      projects p
    LEFT JOIN
      developers d
    ON
      p.developerId = d.id
    LEFT JOIN
      developerInfos di
    ON
      d.id = di.developerId
    WHERE
      p.id = $1;
   `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const data = await client.query<IProject>(queryConfig);
  return data.rows[0];
};

export const createProject = async (
  name: string,
  description: string,
  repository: string,
  startDate: Date,
  endDate: Date,
  developerId: number
) => {
  const queryString = `
    INSERT INTO projects (name, description, repository, startDate, endDate, developerId)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name, description, repository, startDate, endDate, developerId],
  };

  const data = await client.query<IProject>(queryConfig);
  return data.rows[0];
};

export const updateProject = async (
  id: string,
  name: string,
  description: string,
  repository: string,
  startDate: Date,
  endDate: Date,
  developerId: number
) => {
  const queryString = `
    UPDATE projects
    SET name = $2, description = $3, repository = $4, startDate = $5, endDate = $6, developerId = $7
    WHERE id = $1
    RETURNING *
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [
      id,
      name,
      description,
      repository,
      startDate,
      endDate,
      developerId,
    ],
  };

  const data = await client.query<IProject>(queryConfig);
  return data.rows[0];
};
