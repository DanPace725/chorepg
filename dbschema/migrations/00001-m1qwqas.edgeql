CREATE MIGRATION m1qwqascvpwrtsft46k6kcawaiq52zwyygccxdyfz6cswk4vps5jza
    ONTO initial
{
  CREATE TYPE default::Admin {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY passwordHash: std::str;
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::User {
      CREATE REQUIRED LINK admin: default::Admin;
      CREATE REQUIRED PROPERTY currentLevel: std::int64;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY totalXp: std::int64;
      CREATE REQUIRED PROPERTY virtualCurrency: std::int64;
  };
};
