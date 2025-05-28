@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true, envFilePath:'.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      port: 5432,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true,
      ssl: {
        rejectUnauthorized:false
      },
    }),
    MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}