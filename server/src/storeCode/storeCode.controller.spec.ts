import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../auth/basicAuth.guard";
import { ACLModule } from "../auth/acl.module";
import { StoreCodeController } from "./storeCode.controller";
import { StoreCodeService } from "./storeCode.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  qrCode: "exampleQrCode",
  createdAt: new Date(),
  id: "exampleId",
  isDelete: "true",
  storeId: "exampleStoreId",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  qrCode: "exampleQrCode",
  createdAt: new Date(),
  id: "exampleId",
  isDelete: "true",
  storeId: "exampleStoreId",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    qrCode: "exampleQrCode",
    createdAt: new Date(),
    id: "exampleId",
    isDelete: "true",
    storeId: "exampleStoreId",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  qrCode: "exampleQrCode",
  createdAt: new Date(),
  id: "exampleId",
  isDelete: "true",
  storeId: "exampleStoreId",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("StoreCode", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: StoreCodeService,
          useValue: service,
        },
      ],
      controllers: [StoreCodeController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /store-codes", async () => {
    await request(app.getHttpServer())
      .post("/store-codes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /store-codes", async () => {
    await request(app.getHttpServer())
      .get("/store-codes")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /store-codes/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/store-codes"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /store-codes/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/store-codes"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
