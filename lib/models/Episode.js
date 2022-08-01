const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      `select episodes.*,
      coalesce(
        json_agg(to_jsonb(quotes))
        filter (where quotes.id is not null), '[]'
        ) as quotes from episodes left join quotes on quotes.episode_id = episodes.id
        group by episodes.id;`
    );

    return rows.map((row) => new Episode(row));
    // implement getAll() method to return a list of Episodes with quotes
  }
}

module.exports = { Episode };
