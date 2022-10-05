import { getTableRows } from "src/pages/Devices/tableRows/index";
import { render, screen } from "@testing-library/react";

jest.mock("src/pages/Devices/DeviceIcon.tsx", () => (props) => {
  return <mock-device-icon data-testid="device-icon" {...props} />;
});
jest.mock("src/pages/Devices/tableRows/DeviceActions.tsx", () => () => {
  return <mock-device-action data-testid="device-action" />;
});

describe("get device table rows", () => {
  it("should be a function", () => {
    expect(typeof getTableRows).toBe("function");
  });
  it("should return device id as key", () => {
    const results = getTableRows(
      [
        {
          id: 1,
          type: "",
          device: { pc_type: "" },
          operating_system: { id: 1, platform: "", version: "" },
        },
        {
          id: 2,
          type: "",
          device: { pc_type: "" },
          operating_system: { id: 1, platform: "", version: "" },
        },
      ],
      () => {},
      (s) => s
    );

    expect(results).toEqual([
      expect.objectContaining({ key: 1 }),
      expect.objectContaining({ key: 2 }),
    ]);
  });
  it("should return device type as title", () => {
    const results = getTableRows(
      [
        {
          id: 1,
          type: "type 1",
          device: { pc_type: "" },
          operating_system: { id: 1, platform: "", version: "" },
        },
        {
          id: 2,
          type: "type 2",
          device: { pc_type: "" },
          operating_system: { id: 1, platform: "", version: "" },
        },
      ],
      () => {},
      (s) => s
    );
    expect(results).toEqual([
      expect.objectContaining({
        type: expect.objectContaining({ title: "type 1" }),
      }),
      expect.objectContaining({
        type: expect.objectContaining({ title: "type 2" }),
      }),
    ]);
  });
  it("should return a device icon component with the correct prop device_type", async () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { pc_type: "" },
        operating_system: { id: 1, platform: "", version: "" },
      },
      {
        id: 2,
        type: "type_2",
        device: { pc_type: "" },
        operating_system: { id: 1, platform: "", version: "" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      render(result.type.content);
    });
    screen.getAllByTestId("device-icon").forEach((icon, index) => {
      expect(icon.getAttribute("device_type")).toEqual(data[index].type);
    });
  });
  it("should return manufacturer and model (if presents) as device", () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { pc_type: "Notebook" },
        operating_system: { id: 1, platform: "", version: "" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      expect(result).toHaveProperty("device", "Notebook");
    });
  });
  it("should return pc_type (if presents) as device", () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { manufacturer: "Samsung", model: "Galaxy" },
        operating_system: { id: 1, platform: "", version: "" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      expect(result).toHaveProperty("device", "Samsung Galaxy");
    });
  });
  it("should return operating system platform as os", () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { pc_type: "" },
        operating_system: { id: 1, platform: "Windows", version: "10" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      expect(result).toHaveProperty("os", "Windows");
    });
  });
  it("should return operating system version as os_version", () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { manufacturer: "Samsung", model: "Galaxy" },
        operating_system: { id: 1, platform: "windows", version: "10" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      expect(result).toHaveProperty("os_version", "10");
    });
  });
  it("should return a device actions component", async () => {
    const data = [
      {
        id: 1,
        type: "type_1",
        device: { pc_type: "" },
        operating_system: { id: 1, platform: "", version: "" },
      },
      {
        id: 2,
        type: "type_2",
        device: { pc_type: "" },
        operating_system: { id: 1, platform: "", version: "" },
      },
    ];
    const results = getTableRows(
      data,
      () => {},
      (s) => s
    );
    results.forEach((result) => {
      render(result.actions.content);
    });
    screen.getAllByTestId("device-action").forEach((component) => {
      expect(component).toBeVisible();
    });
  });
});
