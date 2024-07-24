module default {
  type Admin {
    required property username -> str {
      constraint exclusive;
    }
    required property passwordHash -> str;
    required property name -> str;
  }

  type User {
    required property name -> str;
    required property currentLevel -> int64;
    required property totalXp -> int64;
    required property virtualCurrency -> int64;
    required link admin -> Admin;
  }

  type Task {
    required property name -> str;
    required property description -> str;
    required property type -> str;
    required property baseXp -> int64;
    required property repeating -> bool;
    required property frequency -> str;
    required link admin -> Admin;
  }

  type SmallReward {
    required property name -> str;
    required property description -> str;
    required property probabilityWeight -> int64;
    required link admin -> Admin;
  }

  type LevelReward {
    required property name -> str;
    required property description -> str;
    required link admin -> Admin;
  }

  type ActivityLog {
    required property date -> datetime;
    required property xpEarned -> int64;
    required property currencyEarned -> int64;
    required link admin -> Admin;
    required link user -> User;
    required link task -> Task;
    optional link smallReward -> SmallReward;
  }

  type Level {
    required property xpRequired -> int64;
    required link admin -> Admin;
    required link levelReward -> LevelReward;
  }
}