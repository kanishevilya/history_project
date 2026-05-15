"use client";

type Row = { param: string; value: string; unit: string };

export function CadSpecTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: Row[];
}) {
  return (
    <div className="ch5-cad-wrap">
      <div className="ch5-cad-head">
        <p className="ch5-meta">{title}</p>
        <p className="ch5-meta mt-1 opacity-60">{subtitle}</p>
      </div>
      <table className="ch5-cad-table">
        <thead>
          <tr>
            <th className="w-[58%]">Параметр</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.param}>
              <td className="ch5-sans text-[0.8rem] normal-case tracking-normal leading-snug">
                {row.param}
              </td>
              <td>
                <span className="ch5-cad-value">{row.value}</span>
                {row.unit && <span className="ch5-cad-unit">{row.unit}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
