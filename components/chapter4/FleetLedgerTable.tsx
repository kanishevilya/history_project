"use client";

type Row = { category: string; value: string };

export function FleetLedgerTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="ch4-ledger-wrap">
      <p className="ch4-meta mb-4 text-[#141414]">{title}</p>
      <table className="ch4-ledger">
        <thead>
          <tr>
            <th className="w-[68%]">Категория флота</th>
            <th>Сокращение</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.category}>
              <td className="ch4-sans text-[0.8rem] normal-case tracking-normal">
                {row.category}
              </td>
              <td className="ch4-ledger-num">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
